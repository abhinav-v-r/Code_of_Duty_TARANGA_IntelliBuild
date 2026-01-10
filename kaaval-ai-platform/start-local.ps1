# Kaaval AI - Start Local Development Servers
# This script starts both frontend and backend in separate processes

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Kaaval AI Platform" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start Backend
Write-Host "Starting Backend API..." -ForegroundColor Yellow
$backendPath = Join-Path $PSScriptRoot "backend\ai-service"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; .\venv\Scripts\Activate.ps1; python main.py" -WindowStyle Normal

Start-Sleep -Seconds 3

# Start Frontend
Write-Host "Starting Frontend..." -ForegroundColor Yellow
$frontendPath = Join-Path $PSScriptRoot "frontend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  ✓ Services Starting!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend will be available at: http://localhost:8000" -ForegroundColor Cyan
Write-Host "Frontend will be available at: http://localhost:3000" -ForegroundColor Cyan
Write-Host "API Documentation: http://localhost:8000/api/docs" -ForegroundColor Cyan
Write-Host ""
Write-Host "Two new PowerShell windows have opened:" -ForegroundColor Yellow
Write-Host "  1. Backend API Server" -ForegroundColor White
Write-Host "  2. Frontend Dev Server" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C in each window to stop the servers" -ForegroundColor Yellow
Write-Host ""
