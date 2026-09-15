@echo off
title KRISHNA X EDITZ - 3D Showcase & Server
echo Starting KRISHNA X EDITZ Backend Server & Interactive Showcase...
cd /d "%~dp0"
start "KRISHNA X EDITZ SERVER" cmd /k "node server.js"
timeout /t 2 /nobreak >nul
start "" "http://localhost:3000"
exit

