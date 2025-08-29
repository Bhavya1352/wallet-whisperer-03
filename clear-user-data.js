// Clear all user data from localStorage
console.log('🗑️ Clearing all user data...');

// Clear localStorage
localStorage.removeItem('user');
localStorage.removeItem('token');
localStorage.removeItem('allUsers');
localStorage.removeItem('transactions');
localStorage.removeItem('budgets');
localStorage.removeItem('goals');

console.log('✅ All user data cleared!');
console.log('🔄 Please refresh the page to see login screen.');