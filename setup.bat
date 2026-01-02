@echo off
echo Setting up Naresh Portfolio Project...
echo.

echo Installing frontend dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo Failed to install frontend dependencies
    pause
    exit /b 1
)

echo.
echo Installing backend dependencies...
cd ..\backend
call npm install
if %errorlevel% neq 0 (
    echo Failed to install backend dependencies
    pause
    exit /b 1
)

cd ..
echo.
echo Setup complete!
echo.
echo Next steps:
echo 1. Copy .env.example to .env in both frontend and backend folders
echo 2. Fill in your environment variables
echo 3. Run 'npm run dev:backend' in one terminal
echo 4. Run 'npm run dev:frontend' in another terminal
echo.
pause