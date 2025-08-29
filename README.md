# 💰 Expense Tracker - Full Stack Application

A modern, responsive expense tracking application built with React.js and Node.js. Perfect for managing personal finances with real-time analytics and beautiful visualizations.

## 🚀 Features

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Secure password hashing with bcrypt

### 💳 Transaction Management
- Add income and expense transactions
- Categorize transactions
- Real-time balance calculation
- Transaction history with filtering

### 📊 Analytics & Insights
- Visual charts and graphs
- Category-wise spending breakdown
- Monthly/yearly financial trends
- Balance tracking over time

### 🎨 Modern UI/UX
- Responsive design for all devices
- Beautiful gradient backgrounds
- Smooth animations and transitions
- Intuitive user interface

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

### 1. Clone Repository
```bash
git clone <repository-url>
cd expense-tracker
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
MONGO_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your-secret-key
PORT=3001
```

Start backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Access Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 🎯 Usage

### Getting Started
1. **Register**: Create a new account with your email
2. **Login**: Sign in to access your dashboard
3. **Add Transactions**: Record your income and expenses
4. **View Analytics**: Check your financial insights
5. **Track Progress**: Monitor your spending patterns

### Demo Credentials
- Email: `demo@example.com`
- Password: `password123`

## 📱 Screenshots

### Login Page
- Clean, modern design
- Responsive layout
- Demo credentials provided

### Dashboard
- Financial overview cards
- Quick action buttons
- Recent transactions
- Balance visualization

### Analytics
- Interactive charts
- Category breakdowns
- Spending trends

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Transactions
- `GET /api/transactions` - Get user transactions
- `POST /api/transactions` - Add new transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Analytics
- `GET /api/stats` - Get financial statistics

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy to Vercel
```

### Backend (Railway/Heroku)
```bash
# Set environment variables
# Deploy to your preferred platform
```

## 📈 Future Enhancements

- [ ] Budget planning and alerts
- [ ] Recurring transactions
- [ ] Export data to CSV/PDF
- [ ] Multi-currency support
- [ ] Mobile app (React Native)
- [ ] Bank account integration
- [ ] Investment tracking

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Your Name**
- Portfolio: [your-portfolio.com]
- LinkedIn: [your-linkedin]
- Email: [your-email]

---

⭐ **Star this repository if you found it helpful!**

Built with ❤️ using React.js and Node.js