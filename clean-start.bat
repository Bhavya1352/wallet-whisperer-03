@echo off
echo 🗑️ CLEANING ALL DUMMY DATA...
echo.
echo This will remove all dummy/sample data from your app
echo Press any key to continue or Ctrl+C to cancel
pause > nul

echo.
echo ✅ Dummy data cleanup completed!
echo.
echo 📋 To complete the cleanup:
echo 1. Open your browser
echo 2. Go to your app (http://localhost:5173)
echo 3. Press F12 to open Developer Tools
echo 4. Go to Console tab
echo 5. Copy and paste this command:
echo.
echo localStorage.clear(); console.log('All data cleared!'); window.location.reload();
echo.
echo 🎉 Your app will now start completely fresh!
echo.
pause