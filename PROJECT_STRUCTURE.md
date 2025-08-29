# 📁 Project Structure

## 🎯 Overview
This is a full-stack expense tracker application with a clean, modular architecture.

```
expense-tracker/
├── 📂 backend/                 # Node.js API Server
│   ├── 📄 server.js           # Main server file
│   ├── 📄 package.json        # Backend dependencies
│   └── 📄 .env               # Environment variables
│
├── 📂 frontend/               # React.js Application
│   ├── 📂 src/
│   │   ├── 📂 components/     # Reusable UI components
│   │   │   ├── 📄 Login.jsx          # Authentication form
│   │   │   ├── 📄 Dashboard.jsx      # Main dashboard
│   │   │   ├── 📄 Navbar.jsx         # Navigation bar
│   │   │   ├── 📄 StatsCards.jsx     # Financial statistics
│   │   │   ├── 📄 TransactionForm.jsx # Add transactions
│   │   │   ├── 📄 RecentTransactions.jsx # Transaction list
│   │   │   └── 📄 ExpenseChart.jsx    # Data visualization
│   │   ├── 📄 App.jsx         # Main app component
│   │   ├── 📄 App.css         # Custom styles
│   │   └── 📄 main.jsx        # App entry point
│   ├── 📄 package.json        # Frontend dependencies
│   ├── 📄 vite.config.js      # Vite configuration
│   └── 📄 tailwind.config.js  # Tailwind CSS config
│
├── 📄 README.md               # Project documentation
├── 📄 PROJECT_STRUCTURE.md    # This file
└── 📄 start.bat              # Quick start script
```

## 🔧 Backend Architecture

### 📄 server.js
- **Express.js** server setup
- **MongoDB** connection with Mongoose
- **JWT** authentication middleware
- **CORS** configuration
- API routes for auth, transactions, and stats

### 🔐 Authentication
- User registration and login
- Password hashing with bcrypt
- JWT token generation and validation
- Protected routes with middleware

### 📊 Database Models
- **User Model**: name, email, password, timestamps
- **Transaction Model**: userId, type, amount, description, category, date

### 🛣️ API Routes
```
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
GET  /api/transactions     # Get user transactions
POST /api/transactions     # Add new transaction
DELETE /api/transactions/:id # Delete transaction
GET  /api/stats           # Get financial statistics
```

## 🎨 Frontend Architecture

### ⚛️ React Components

#### 🔑 Login.jsx
- User authentication form
- Toggle between login/register
- Form validation and error handling
- Demo credentials display

#### 📊 Dashboard.jsx
- Main application dashboard
- Financial overview cards
- Quick action buttons
- Data fetching and state management

#### 🧭 Navbar.jsx
- Navigation between pages
- User profile display
- Responsive mobile menu
- Logout functionality

#### 📈 StatsCards.jsx
- Financial statistics display
- Currency formatting
- Progress indicators
- Responsive grid layout

#### 📝 TransactionForm.jsx
- Modal form for adding transactions
- Category selection
- Form validation
- Loading states

#### 📋 RecentTransactions.jsx
- Transaction list display
- Delete functionality
- Date formatting
- Empty state handling

#### 📊 ExpenseChart.jsx
- Pie chart visualization
- Category breakdown
- Interactive tooltips
- Responsive design

### 🎨 Styling
- **Tailwind CSS** for utility-first styling
- Custom CSS for animations and effects
- Responsive design for all devices
- Modern gradient backgrounds

### 🔄 State Management
- React hooks (useState, useEffect)
- Local storage for persistence
- API integration with fetch
- Real-time data updates

## 🚀 Key Features

### ✨ User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Instant data refresh after actions
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Animations**: Smooth transitions and hover effects

### 🔒 Security
- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt for password security
- **Protected Routes**: Middleware for route protection
- **Input Validation**: Client and server-side validation

### 📊 Data Visualization
- **Interactive Charts**: Recharts library integration
- **Category Breakdown**: Pie chart for expense analysis
- **Statistics Cards**: Key financial metrics
- **Progress Indicators**: Visual progress bars

## 🛠️ Development Workflow

### 🏃‍♂️ Quick Start
1. Run `start.bat` to install dependencies and start both servers
2. Backend runs on `http://localhost:3001`
3. Frontend runs on `http://localhost:5173`

### 🔧 Development Commands
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

### 📦 Production Build
```bash
# Frontend build
cd frontend
npm run build

# Backend deployment
cd backend
npm start
```

## 🎯 Future Enhancements

### 📱 Mobile App
- React Native version
- Offline functionality
- Push notifications

### 💰 Advanced Features
- Budget planning and alerts
- Recurring transactions
- Multi-currency support
- Bank account integration

### 📊 Analytics
- Advanced reporting
- Export to PDF/CSV
- Spending predictions
- Financial goals tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Built with ❤️ for modern expense tracking**