# Wallet Whisperer - Personal Finance Tracker

A full-stack personal finance management application built with React, Node.js, Express, and MongoDB.

## 🚀 Live Demo
[View Live Application](https://your-vercel-app.vercel.app)

## Features
- User Authentication (Register/Login)
- Transaction Management (Add/View/Track)
- Budget Planning
- Goal Setting
- Analytics Dashboard
- Responsive Design

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Deployment**: Vercel

## Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB connection string

### Installation
```bash
# Clone repository
git clone https://github.com/yourusername/wallet-whisperer-03.git
cd wallet-whisperer-03

# Install dependencies
cd frontend && npm install
cd ../backend && npm install

# Setup environment variables
cp .env.example backend/.env
# Add your MONGO_URI and JWT_SECRET

# Run development servers
cd frontend && npm run dev
cd ../backend && npm run dev
```

## Deployment
This app is configured for Vercel deployment with both frontend and backend.

### Environment Variables Required:
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: production

## API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/transactions` - Get user transactions
- `POST /api/transactions` - Add new transaction

## Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request