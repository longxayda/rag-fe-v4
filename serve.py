#\!/usr/bin/env python3
import http.server
import socketserver
import os
import sys

PORT = 3001
DIRECTORY = '/root/heritage-web/dist'

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def do_GET(self):
        # Check if the file exists
        file_path = os.path.join(DIRECTORY, self.path.lstrip('/'))
        if not os.path.exists(file_path) and not self.path.startswith('/api'):
            # For SPA, serve index.html for non-existing paths
            self.path = '/index.html'
        return super().do_GET()

with socketserver.TCPServer(('0.0.0.0', PORT), SPAHandler) as httpd:
    print(f'Serving at port {PORT}')
    httpd.serve_forever()
