#!/bin/bash

# PWA Icons Validation Script
# This script validates that all referenced icon files exist

echo "🔍 PWA Icons Validation for rag-fe project"
echo "==========================================="
echo ""

PROJECT_ROOT="/Users/nguyennt/Documents/rag-fe"
ERRORS=0

# Check if required files exist
echo "📁 Checking for existing icon files..."
echo ""

# Main icon
if [ -f "$PROJECT_ROOT/public/icons/icon.svg" ]; then
    echo "✅ /public/icons/icon.svg - EXISTS"
else
    echo "❌ /public/icons/icon.svg - MISSING"
    ((ERRORS++))
fi

# Shortcut icons
if [ -f "$PROJECT_ROOT/public/icons/chat-shortcut.svg" ]; then
    echo "✅ /public/icons/chat-shortcut.svg - EXISTS"
else
    echo "❌ /public/icons/chat-shortcut.svg - MISSING"
    ((ERRORS++))
fi

if [ -f "$PROJECT_ROOT/public/icons/heritage-shortcut.svg" ]; then
    echo "✅ /public/icons/heritage-shortcut.svg - EXISTS"
else
    echo "❌ /public/icons/heritage-shortcut.svg - MISSING"
    ((ERRORS++))
fi

if [ -f "$PROJECT_ROOT/public/icons/quiz-shortcut.svg" ]; then
    echo "✅ /public/icons/quiz-shortcut.svg - EXISTS"
else
    echo "❌ /public/icons/quiz-shortcut.svg - MISSING"
    ((ERRORS++))
fi

# Screenshot files
if [ -f "$PROJECT_ROOT/public/screenshots/desktop.svg" ]; then
    echo "✅ /public/screenshots/desktop.svg - EXISTS"
else
    echo "❌ /public/screenshots/desktop.svg - MISSING"
    ((ERRORS++))
fi

if [ -f "$PROJECT_ROOT/public/screenshots/mobile.svg" ]; then
    echo "✅ /public/screenshots/mobile.svg - EXISTS"
else
    echo "❌ /public/screenshots/mobile.svg - MISSING"
    ((ERRORS++))
fi

echo ""
echo "📋 Checking manifest.json for non-existent PNG references..."
echo ""

# Check if manifest.json still has PNG references
if grep -q "\.png" "$PROJECT_ROOT/public/manifest.json"; then
    echo "⚠️  WARNING: manifest.json still contains .png references"
    echo "    PNG files found in manifest:"
    grep -o '"src": "[^"]*\.png"' "$PROJECT_ROOT/public/manifest.json" | sed 's/"src": /    - /'
    ((ERRORS++))
else
    echo "✅ No PNG references in manifest.json"
fi

echo ""
echo "📋 Checking index.html for non-existent PNG references..."
echo ""

# Check index.html for uncommented PNG references (excluding content between <!-- and -->)
# Use sed to remove HTML comments first, then check for .png
ACTIVE_PNG=$(sed '/<!--/,/-->/d' "$PROJECT_ROOT/index.html" | grep -o 'href="[^"]*\.png"' || echo "")
if [ -n "$ACTIVE_PNG" ]; then
    echo "⚠️  WARNING: index.html contains active .png references"
    echo "    Active PNG references:"
    echo "$ACTIVE_PNG" | sed 's/href=/    - /'
    ((ERRORS++))
else
    echo "✅ No active PNG references in index.html (commented ones are OK)"
fi

echo ""
echo "==========================================="
if [ $ERRORS -eq 0 ]; then
    echo "✅ VALIDATION PASSED - All referenced files exist!"
    echo "   No 404 errors should occur for icon files."
else
    echo "❌ VALIDATION FAILED - $ERRORS issue(s) found"
    exit 1
fi

