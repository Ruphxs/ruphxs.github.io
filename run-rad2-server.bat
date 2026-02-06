@echo off
setlocal enabledelayedexpansion

REM ================================================================
REM RAD 2 (Roguelike Adventures and Dungeons 2) server launcher
REM Put this file inside your RAD2 server folder and double-click it.
REM ================================================================

REM --- Settings you can edit ---
set "MIN_RAM=4G"
set "MAX_RAM=8G"
set "JAVA_EXE=java"
set "AUTO_ACCEPT_EULA=true"
set "RESTART_ON_CRASH=true"
set "RESTART_DELAY_SECONDS=10"
REM -----------------------------

cd /d "%~dp0"

echo [RAD2] Working directory: %CD%

where "%JAVA_EXE%" >nul 2>nul
if errorlevel 1 (
  echo [RAD2] ERROR: Java was not found.
  echo [RAD2] Install Java 8/17 (as required by your server pack),
  echo [RAD2] or set JAVA_EXE to the full path of java.exe in this file.
  pause
  exit /b 1
)

if /i "%AUTO_ACCEPT_EULA%"=="true" (
  if not exist "eula.txt" (
    echo [RAD2] Creating eula.txt...
    > "eula.txt" echo eula=true
  ) else (
    powershell -NoProfile -Command "(Get-Content 'eula.txt') -replace '^eula=false$','eula=true' | Set-Content 'eula.txt'"
  )
)

set "START_SCRIPT="
for %%F in (start.bat Start.bat ServerStart.bat run.bat launch.bat) do (
  if exist "%%~F" set "START_SCRIPT=%%~F"
)

set "SERVER_JAR="
if not defined START_SCRIPT (
  for %%J in (forge-*.jar *server*.jar *universal*.jar) do (
    if not defined SERVER_JAR set "SERVER_JAR=%%~J"
  )
)

if not defined START_SCRIPT if not defined SERVER_JAR (
  echo [RAD2] ERROR: Could not find a server start script or server jar.
  echo [RAD2] Place this file in the RAD2 server root folder.
  pause
  exit /b 1
)

:run_server
cls
echo [RAD2] ===============================================
echo [RAD2] Launching RAD2 server...
echo [RAD2] Min RAM: %MIN_RAM%  Max RAM: %MAX_RAM%
echo [RAD2] ===============================================

if defined START_SCRIPT (
  call "%START_SCRIPT%"
) else (
  "%JAVA_EXE%" -Xms%MIN_RAM% -Xmx%MAX_RAM% -jar "%SERVER_JAR%" nogui
)

set "EXIT_CODE=%ERRORLEVEL%"
echo.
echo [RAD2] Server process exited with code %EXIT_CODE%.

if /i not "%RESTART_ON_CRASH%"=="true" goto done

echo [RAD2] Restarting in %RESTART_DELAY_SECONDS% seconds... (Ctrl+C to stop)
timeout /t %RESTART_DELAY_SECONDS% /nobreak >nul
goto run_server

:done
echo [RAD2] Launcher finished.
pause
exit /b %EXIT_CODE%
