@echo off
set "GIT_EXE=%LOCALAPPDATA%\Programs\Git\cmd\git.exe"

echo ===============================================================
echo   NEXUS // PLAY - GitHub Direct Push
echo   Target Repository: https://github.com/bsvikash07-max/nexus-play-3d.git
echo ===============================================================
echo.
echo Pushing your files to GitHub...
echo (A browser sign-in window will open if this is your first time)
echo.

"%GIT_EXE%" push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===============================================================
    echo   SUCCESS! Your project is now pushed to GitHub!
    echo   View it at: https://github.com/bsvikash07-max/nexus-play-3d
    echo ===============================================================
) else (
    echo.
    echo [NOTE] If you saw an authentication error or closed the window,
    echo run this file again to retry.
)

echo.
pause
