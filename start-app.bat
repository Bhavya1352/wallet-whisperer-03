@echo off
echo 🚀 Starting Wallet Whisperer...
echo.

echo 📦 Installing dependencies...
cd backend
call npm install
cd ../frontend  
call npm install
cd ..

echo.
echo 🔥 Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak > nul

echo 🌐 Starting Frontend...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ✅ Both servers are starting!
echo 📊 Backend: http://localhost:3001
echo 🌐 Frontend: http://localhost:5173
echo.
echo Press any key to exit...
pause > nul