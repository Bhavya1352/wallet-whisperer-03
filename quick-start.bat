@echo off
echo 🚀 Quick Start - Expense Tracker
echo.

echo 📦 Backend Setup...
cd backend
call npm install
start "Backend" cmd /k "npm run dev"

echo ⏳ Wait 3 seconds...
timeout /t 3 /nobreak > nul

echo 🌐 Frontend Setup...
cd ..\frontend
call npm install
call npm run dev

pause