const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://wallet-whisperer-backend.vercel.app/api' 
  : 'http://localhost:5000/api';

// Mock signup for testing
const mockSignup = () => {
  localStorage.setItem('token', 'mock-token');
  localStorage.setItem('user', JSON.stringify({name: 'Test User', email: 'test@test.com'}));
  window.location.reload();
};

export const api = {
  register: async (userData: { name: string; email: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  getTransactions: async (token: string) => {
    // Mock transaction retrieval
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    return { success: true, transactions };
  },

  addTransaction: async (token: string, transaction: any) => {
    // Mock transaction storage
    const existingTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      date: new Date().toISOString(),
      userId: JSON.parse(localStorage.getItem('user') || '{}').id
    };
    existingTransactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(existingTransactions));
    
    return { success: true, transaction: newTransaction };
  },
};