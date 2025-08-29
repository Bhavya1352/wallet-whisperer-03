// Run this in browser console to clear all dummy data
console.log('🗑️ Clearing all dummy data...');

// Clear all possible dummy data keys
const dummyKeys = [
  'allTransactions',
  'allBudgets', 
  'allGoals',
  'demoData',
  'dummyTransactions',
  'sampleData',
  'testData'
];

dummyKeys.forEach(key => {
  localStorage.removeItem(key);
  console.log(`✅ Cleared: ${key}`);
});

console.log('🎉 All dummy data cleared!');
console.log('Now refresh the page and login again.');