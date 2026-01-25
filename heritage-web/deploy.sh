#!/bin/bash

# Deploy script for Heritage Web Application
# This script will build and deploy the application to production server

set -e  # Exit on error

echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║                    DEPLOY HERITAGE WEB APPLICATION                           ║"
echo "╚══════════════════════════════════════════════════════════════════════════════╝"
echo ""

# Configuration
SERVER="root@36.50.26.18"
PASSWORD="3Ys29nxTpAMmS7cF"
REMOTE_PATH="/root/heritage-web"
LOCAL_PATH="$HOME/Documents/rag-fe"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Build the application
echo -e "${BLUE}[1/5] Building application...${NC}"
npm run build
echo -e "${GREEN}✓ Build completed${NC}"
echo ""

# Step 2: Sync files to server (excluding node_modules)
echo -e "${BLUE}[2/5] Syncing files to server...${NC}"
sshpass -p "$PASSWORD" rsync -avz --exclude 'node_modules' \
  --exclude '.git' \
  --exclude 'dist' \
  --exclude '.env.local' \
  "$LOCAL_PATH/" \
  "$SERVER:$REMOTE_PATH/"
echo -e "${GREEN}✓ Files synced${NC}"
echo ""

# Step 3: Install dependencies on server
echo -e "${BLUE}[3/5] Installing dependencies on server...${NC}"
sshpass -p "$PASSWORD" ssh "$SERVER" << 'ENDSSH'
cd /root/heritage-web
npm install --production
ENDSSH
echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

# Step 4: Build on server
echo -e "${BLUE}[4/5] Building on server...${NC}"
sshpass -p "$PASSWORD" ssh "$SERVER" << 'ENDSSH'
cd /root/heritage-web
npm run build
ENDSSH
echo -e "${GREEN}✓ Server build completed${NC}"
echo ""

# Step 5: Restart the application
echo -e "${BLUE}[5/5] Restarting application...${NC}"
sshpass -p "$PASSWORD" ssh "$SERVER" << 'ENDSSH'
cd /root/heritage-web

# Kill existing process
pkill -f "vite preview" || true
pkill -f "npm run preview" || true

# Start preview server in background
nohup npm run preview -- --host 0.0.0.0 --port 4173 > /root/heritage-web/preview.log 2>&1 &

# Wait a bit for server to start
sleep 3

echo "Application started on port 4173"
ENDSSH
echo -e "${GREEN}✓ Application restarted${NC}"
echo ""

echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║                           DEPLOYMENT COMPLETED                               ║"
echo "╚══════════════════════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}✓ Deployment successful!${NC}"
echo ""
echo "Access your application at: http://36.50.26.18:4173"
echo ""
echo "Useful commands:"
echo "  - View logs: ssh $SERVER 'tail -f $REMOTE_PATH/preview.log'"
echo "  - Restart: ssh $SERVER 'cd $REMOTE_PATH && pkill -f vite && npm run preview -- --host 0.0.0.0 --port 4173 &'"
echo ""
