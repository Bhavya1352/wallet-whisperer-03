# 🧠 Wallet Whisperer - Smart Finance Tracker

A **full-stack personal finance management application** with **AI-powered insights** built with React, Node.js, Express, and MongoDB.

## 🚀 Live Demo
[View Live Application](https://your-vercel-app.vercel.app)

## ✨ Smart Features
- 🧠 **AI-Powered Financial Insights** - Smart spending analysis
- 🔮 **Spending Predictions** - Forecast next month's expenses
- 📊 **Real-time Analytics** - Weekly spending patterns
- ⚠️ **Risk Detection** - Identify problematic spending categories
- 💰 **Savings Rate Tracking** - Visual progress monitoring
- 🎯 **Smart Recommendations** - Personalized financial advice
- 📱 **Responsive Design** - Works on all devices

## 🎯 Core Features
- User Authentication (Register/Login)
- Transaction Management (Add/View/Track)
- Budget Planning & Goal Setting
- Interactive Dashboard
- Export & Sharing Options

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Deployment**: Vercel

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Node.js (v18+) - [Download](https://nodejs.org/)
- Git - [Download](https://git-scm.com/)

### Installation
```bash
# Clone repository
git clone https://github.com/yourusername/wallet-whisperer-03.git
cd wallet-whisperer-03

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Setup environment (backend folder)
echo MONGO_URI=mongodb://localhost:27017/wallet-whisperer > backend/.env
echo JWT_SECRET=your-super-secret-key >> backend/.env

# Run both servers
# Terminal 1 (Backend)
cd backend && npm run dev

# Terminal 2 (Frontend) 
cd frontend && npm run dev
```

### 🧠 Test Smart Features
1. **Create Sample Data**: http://localhost:5000/api/admin/create-sample
2. **View Dashboard**: http://localhost:5173
3. **Click "🧠 Smart Insights"** for AI analysis

📖 **Detailed Setup**: See [SETUP_GUIDE.md](SETUP_GUIDE.md)

## Deployment
This app is configured for Vercel deployment with both frontend and backend.

### Environment Variables Required:
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: production

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Transactions
- `GET /api/transactions` - Get user transactions
- `POST /api/transactions` - Add new transaction

### 🧠 Smart Features (NEW!)
- `GET /api/smart/analyze/:userId` - AI expense analysis
- `GET /api/insights/weekly` - Weekly spending insights
- `GET /api/predict/next-month` - Spending predictions

### Admin Panel
- `GET /api/admin/users` - View all users
- `GET /api/admin/transactions` - View all transactions
- `GET /api/admin/create-sample` - Create sample data

## 🌟 What Makes It Special

- **AI-Powered**: Smart financial insights and predictions
- **Real-time**: Live spending analysis and alerts
- **Actionable**: Specific recommendations, not just data
- **User-friendly**: Clean, intuitive interface
- **Full-stack**: Complete solution with modern tech stack

## 📤 Share with Friends
See [SHARE_INSTRUCTIONS.md](SHARE_INSTRUCTIONS.md) for easy sharing options!

## 🤝 Contributing
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Create Pull Request

## 📸 Screenshots
*Add your dashboard screenshots here*

---
**Built with ❤️ and 🧠 AI insights**