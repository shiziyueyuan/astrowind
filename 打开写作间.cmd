@echo off
setlocal
set "ASTRO_TELEMETRY_DISABLED=1"
cd /d "%~dp0"
if errorlevel 1 exit /b 1
call npm.cmd run studio
if errorlevel 1 goto failed
exit /b 0
:failed
echo The writing studio could not start. Please check the message above.
pause
endlocal
