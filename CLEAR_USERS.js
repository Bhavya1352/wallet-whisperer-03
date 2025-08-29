// Clear all users and start fresh - Run in browser console
localStorage.removeItem('allUsers');
localStorage.removeItem('user');
localStorage.removeItem('token');
console.log('All users cleared! Refresh page.');
window.location.reload();