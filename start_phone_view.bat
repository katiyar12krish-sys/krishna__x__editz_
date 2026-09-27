@echo off
title KRISHNA X EDITZ - Mobile Phone View
echo ===================================================
echo   KRISHNA X EDITZ - Starting Mobile Phone View...
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

:: Find Chrome or Edge and launch in exact phone screen dimensions (412x915)
set BROWSER=
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    set BROWSER="C:\Program Files\Google\Chrome\Application\chrome.exe"
) else if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" (
    set BROWSER="%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"
) else if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
    set BROWSER="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
) else if exist "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" (
    set BROWSER="C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
) else if exist "C:\Program Files\Microsoft\Edge\Application\msedge.exe" (
    set BROWSER="C:\Program Files\Microsoft\Edge\Application\msedge.exe"
)

if defined BROWSER (
    echo [Launcher] Opening Mobile Phone Window (412x915)...
    start "" %BROWSER% --app="http://localhost:3000" --window-size=412,915 --user-agent="Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
) else (
    echo [Launcher] Opening in default browser...
    start "" "http://localhost:3000/phone_view.html"
)

exit
