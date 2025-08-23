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
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  addTransaction: async (token: string, transaction: any) => {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transaction),
    });
    return response.json();
  },
};