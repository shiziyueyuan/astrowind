@echo off
setlocal
set "ASTRO_TELEMETRY_DISABLED=1"
cd /d "%~dp0"
if errorlevel 1 exit /b 1
if not exist "dist\index.html" (
  call npm.cmd run build
  if errorlevel 1 goto failed
)
call npm.cmd run preview -- --host 127.0.0.1 --port 4323
if errorlevel 1 goto failed
echo Open http://127.0.0.1:4324 in your browser.
echo Keep this window open. Press Ctrl+C to stop the writing studio.
call npm.cmd run studio
if errorlevel 1 goto failed
exit /b 0
:failed
echo The writing studio could not start. Please check the message above.
pause
endlocal
