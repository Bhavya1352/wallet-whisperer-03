// COMPLETE DUMMY DATA REMOVAL SCRIPT
// Run this in browser console to remove ALL dummy entries

console.log('🗑️ REMOVING ALL DUMMY DATA...');

// List of all possible dummy data keys
const dummyDataKeys = [
  // Transaction related
  'allTransactions',
  'dummyTransactions', 
  'sampleTransactions',
  'testTransactions',
  'mockTransactions',
  
  // Budget related
  'allBudgets',
  'dummyBudgets',
  'sampleBudgets',
  'testBudgets',
  
  // Goals related
  'allGoals',
  'dummyGoals',
  'sampleGoals',
  'testGoals',
  
  // User related
  'demoUser',
  'testUser',
  'sampleUser',
  
  // General dummy data
  'demoData',
  'sampleData',
  'testData',
  'mockData',
  'dummyData',
  'initialData',
  'seedData',
  
  // App specific
  'expenseTrackerDemo',
  'walletWhispererDemo',
  'financeAppDemo'
];

// Remove all dummy data
let removedCount = 0;
dummyDataKeys.forEach(key => {
  if (localStorage.getItem(key)) {
    localStorage.removeItem(key);
    console.log(`✅ Removed: ${key}`);
    removedCount++;
  }
});

// Also clear any keys that contain 'dummy', 'sample', 'test', 'mock'
const allKeys = Object.keys(localStorage);
const suspiciousKeys = allKeys.filter(key => 
  key.toLowerCase().includes('dummy') ||
  key.toLowerCase().includes('sample') ||
  key.toLowerCase().includes('test') ||
  key.toLowerCase().includes('mock') ||
  key.toLowerCase().includes('demo')
);

suspiciousKeys.forEach(key => {
  localStorage.removeItem(key);
  console.log(`🧹 Cleaned suspicious key: ${key}`);
  removedCount++;
});

console.log(`\n🎉 CLEANUP COMPLETE!`);
console.log(`📊 Total items removed: ${removedCount}`);
console.log(`💾 Remaining localStorage items: ${Object.keys(localStorage).length}`);

if (Object.keys(localStorage).length > 0) {
  console.log('📋 Remaining items:');
  Object.keys(localStorage).forEach(key => {
    console.log(`  - ${key}`);
  });
}

console.log('\n✨ All dummy data has been removed!');
console.log('🔄 Please refresh the page for a clean start.');

// Optional: Uncomment to auto-refresh
// window.location.reload();