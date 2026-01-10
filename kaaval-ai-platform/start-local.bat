@echo off
echo ========================================
echo   Starting Kaaval AI Platform
echo ========================================
echo.

echo Starting Backend API...
start "Kaaval AI - Backend" cmd /k "cd backend\ai-service && venv\Scripts\activate.bat && python main.py"

timeout /t 3 /nobreak >nul

echo Starting Frontend...
start "Kaaval AI - Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo   Services Starting!
echo ========================================
echo.
echo Backend will be available at: http://localhost:8000
echo Frontend will be available at: http://localhost:3000
echo API Documentation: http://localhost:8000/api/docs
echo.
echo Two new command windows have opened:
echo   1. Backend API Server
echo   2. Frontend Dev Server
echo.
echo Press Ctrl+C in each window to stop the servers
echo.
pause
