# 🚀 Wallet Whisperer - Setup Guide for Friends

## 📋 Quick Start (5 minutes)

### Prerequisites
- Node.js (v18+) - [Download here](https://nodejs.org/)
- Git - [Download here](https://git-scm.com/)

### 1. Clone & Install
```bash
# Clone the project
git clone <YOUR_REPO_URL>
cd wallet-whisperer-03

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Setup Environment
```bash
# Go to backend folder
cd ../backend

# Create .env file
echo MONGO_URI=mongodb://localhost:27017/wallet-whisperer > .env
echo JWT_SECRET=your-super-secret-key >> .env
echo NODE_ENV=development >> .env
```

### 3. Run the Project
```bash
# Terminal 1 - Start Backend (from backend folder)
npm run dev

# Terminal 2 - Start Frontend (from frontend folder)
cd ../frontend
npm run dev
```

### 4. Access the App
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Admin Panel**: http://localhost:5000/api/admin/users

## 🧠 Smart Features Demo

### Test the AI Features:
1. **Create Sample Data**: http://localhost:5000/api/admin/create-sample
2. **View Smart Insights**: Click "🧠 Smart Insights" in dashboard
3. **Check Analytics**: 
   - Weekly Insights: http://localhost:5000/api/insights/weekly
   - Spending Predictor: http://localhost:5000/api/predict/next-month

## 🌐 Deploy Online (Optional)

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Option 2: Railway
1. Connect GitHub repo to Railway
2. Add environment variables
3. Deploy automatically

## 🔧 Troubleshooting

### Common Issues:
- **Port 5000 busy**: Change PORT in backend/.env
- **MongoDB connection**: Use MongoDB Atlas for cloud DB
- **CORS errors**: Check backend cors settings

### Need Help?
- Check console logs for errors
- Ensure both servers are running
- Verify environment variables

## 🎯 Features Included:
- ✅ User Authentication
- ✅ Transaction Management
- ✅ Smart AI Insights
- ✅ Spending Predictions
- ✅ Budget Tracking
- ✅ Goal Setting
- ✅ Real-time Analytics

**Enjoy your smart finance tracker!** 💰🧠