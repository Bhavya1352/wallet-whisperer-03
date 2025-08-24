const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://wallet-whisperer-backend-production.up.railway.app/api'
  : 'http://localhost:5000/api';

export const api = {
  // Auth APIs
  register: async (userData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      return response.json();
    } catch (error) {
      console.error('Register error:', error);
      return { message: 'Network error' };
    }
  },

  login: async (credentials: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      return response.json();
    } catch (error) {
      console.error('Login error:', error);
      return { message: 'Network error' };
    }
  },

  // Transaction APIs
  getTransactions: async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.json();
    } catch (error) {
      console.error('Get transactions error:', error);
      return { transactions: [] };
    }
  },

  addTransaction: async (token: string, transactionData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transactionData),
      });
      return response.json();
    } catch (error) {
      console.error('Add transaction error:', error);
      return { message: 'Network error' };
    }
  },

  // Budget APIs
  getBudgets: async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/budgets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.json();
    } catch (error) {
      console.error('Get budgets error:', error);
      return { budgets: [] };
    }
  },

  addBudget: async (token: string, budgetData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/budgets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(budgetData),
      });
      return response.json();
    } catch (error) {
      console.error('Add budget error:', error);
      return { message: 'Network error' };
    }
  },

  // Goal APIs
  getGoals: async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/goals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.json();
    } catch (error) {
      console.error('Get goals error:', error);
      return { goals: [] };
    }
  },

  addGoal: async (token: string, goalData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/goals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(goalData),
      });
      return response.json();
    } catch (error) {
      console.error('Add goal error:', error);
      return { message: 'Network error' };
    }
  },
};