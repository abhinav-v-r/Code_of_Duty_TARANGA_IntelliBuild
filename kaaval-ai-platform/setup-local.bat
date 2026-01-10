@echo off
echo ========================================
echo   Kaaval AI - Local Setup
echo ========================================
echo.

echo Checking Node.js installation...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js not found. Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js found: %NODE_VERSION%

echo Checking Python installation...
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Python not found. Please install Python 3.11+ from https://python.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('python --version') do set PYTHON_VERSION=%%i
echo [OK] Python found: %PYTHON_VERSION%

echo.
echo ========================================
echo   Setting up Frontend
echo ========================================

cd frontend

if not exist .env.local (
    echo Creating .env.local file...
    (
        echo NEXT_PUBLIC_API_URL=http://localhost:8000
        echo NEXT_PUBLIC_SITE_URL=http://localhost:3000
        echo NEXT_PUBLIC_ENV=development
        echo NEXT_PUBLIC_ENABLE_MOCK_API=true
    ) > .env.local
    echo [OK] .env.local created
)

if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
    echo [OK] Frontend dependencies installed
) else (
    echo [OK] Frontend dependencies already installed
)

cd ..

echo.
echo ========================================
echo   Setting up Backend
echo ========================================

cd backend\ai-service

if not exist .env (
    echo Creating .env file...
    (
        echo ENVIRONMENT=development
        echo DEBUG=True
        echo API_HOST=0.0.0.0
        echo API_PORT=8000
        echo CORS_ORIGINS=http://localhost:3000,http://localhost:3001
        echo LOG_LEVEL=INFO
    ) > .env
    echo [OK] .env created
)

if not exist venv (
    echo Creating Python virtual environment...
    python -m venv venv
    echo [OK] Virtual environment created
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing backend dependencies...
pip install -r requirements.txt
echo [OK] Backend dependencies installed

cd ..\..

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo To start the application:
echo.
echo 1. Start Backend (in terminal 1):
echo    cd backend\ai-service
echo    venv\Scripts\activate.bat
echo    python main.py
echo.
echo 2. Start Frontend (in terminal 2):
echo    cd frontend
echo    npm run dev
echo.
echo 3. Open browser:
echo    Frontend: http://localhost:3000
echo    API Docs: http://localhost:8000/api/docs
echo.
echo Or run: start-local.bat to start both automatically
echo.
pause
