#!/usr/bin/env python3
"""
Local development server for Acquisitions Management Platform.

Firebase Authentication requires HTTP/HTTPS (not file://).
Run this script to serve the app locally via HTTP.

Usage:
    python3 server.py

Then open: http://localhost:8000/acquisitions-app-standalone.html
"""

import http.server
import socketserver
import webbrowser
import os

PORT = 8000
FILE = "acquisitions-app-standalone.html"

os.chdir(os.path.dirname(os.path.abspath(__file__)))

Handler = http.server.SimpleHTTPRequestHandler

print(f"Starting server at http://localhost:{PORT}")
print(f"Opening http://localhost:{PORT}/{FILE}")
print("Press Ctrl+C to stop the server.\n")

webbrowser.open(f"http://localhost:{PORT}/{FILE}")

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
