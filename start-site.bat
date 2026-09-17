@echo off
rem Start a local web server for the CET-4 study site and open it in the browser.
cd /d "%~dp0"
set PORT=8765
echo Starting study site at http://127.0.0.1:%PORT%/
echo Close this window to stop the server.
start "" http://127.0.0.1:%PORT%/index.html
python -m http.server %PORT% --bind 127.0.0.1
