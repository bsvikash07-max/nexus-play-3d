@echo off
set "GIT_EXE=%LOCALAPPDATA%\Programs\Git\cmd\git.exe"

echo ========================================================
echo   NEXUS // PLAY - GitHub Push Assistant
echo ========================================================
echo.

set /p GITHUB_URL="Enter your GitHub Repository HTTPS URL (e.g. https://github.com/username/nexus-play-3d.git): "

if "%GITHUB_URL%"=="" (
    echo [ERROR] No URL entered. Exiting.
    pause
    exit /b 1
)

echo.
echo Setting remote origin to %GITHUB_URL%...
"%GIT_EXE%" remote remove origin >nul 2>&1
"%GIT_EXE%" remote add origin %GITHUB_URL%

echo.
echo Renaming current branch to main...
"%GIT_EXE%" branch -M main

echo.
echo Pushing project to GitHub...
"%GIT_EXE%" push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   SUCCESS! Your repository is now live on GitHub.
    echo ========================================================
) else (
    echo.
    echo [NOTE] If this is a private repo or you need authentication,
    echo Windows Credential Manager will prompt you for sign-in or a token.
)

echo.
pause
