@echo off
title KRISHNA X EDITZ - Phone Simulator & Device Lab
echo ===================================================
echo   KRISHNA X EDITZ - Phone Simulator Lab
echo ===================================================
cd /d "%~dp0"

:: Check if server is running on port 3000
netstat -ano | findstr :3000 >nul
if %ERRORLEVEL% neq 0 (
    echo [Server] Starting backend server on port 3000...
    start "KRISHNA X EDITZ SERVER" /min cmd /k "node server.js"
    timeout /t 2 /nobreak >nul
) else (
    echo [Server] Server is already running on port 3000.
)

echo [Launcher] Opening Interactive Phone Simulator (iPhone 15 Pro, Galaxy S24, Tablet)...
start "" "http://localhost:3000/phone_view.html"
exit
