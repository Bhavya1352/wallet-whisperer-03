@echo off
echo 🚀 Starting Expense Tracker Application...
echo.

echo 📦 Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Backend installation failed
    pause
    exit /b 1
)

echo.
echo 📦 Installing Frontend Dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Frontend installation failed
    pause
    exit /b 1
)

echo.
echo 🔥 Starting Backend Server...
cd ..\backend
start "Backend Server" cmd /k "npm run dev"

echo ⏳ Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo 🌐 Starting Frontend Application...
cd ..\frontend
start "Frontend App" cmd /k "npm run dev"

echo.
echo ✅ Application is starting!
echo 📊 Backend API: http://localhost:3001
echo 🌐 Frontend App: http://localhost:5173
echo.
echo 📝 Demo Login:
echo    Email: demo@example.com
echo    Password: password123
echo.
echo Press any key to exit...
pause > nul