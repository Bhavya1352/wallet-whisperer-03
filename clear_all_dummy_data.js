// Complete localStorage cleanup - Run in browser console
console.log('🗑️ Clearing all dummy data...');

// Clear all transaction data
localStorage.removeItem('allTransactions');
console.log('✅ Transactions cleared');

// Clear all budget data  
localStorage.removeItem('allBudgets');
console.log('✅ Budgets cleared');

// Clear all goals data
localStorage.removeItem('allGoals');
console.log('✅ Goals cleared');

// Keep users but you can clear them too if needed
// localStorage.removeItem('allUsers');

console.log('🎉 All dummy data cleared! Refresh page for clean start.');
window.location.reload();