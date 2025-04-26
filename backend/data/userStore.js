const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, 'users.json');

// Load users from file
let users = [];
try {
  if (fs.existsSync(usersFilePath)) {
    users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
  }
} catch (err) {
  console.error('❌ Failed to read users file:', err);
}

// Save to file
const saveUsers = () => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('❌ Failed to save users file:', err);
  }
};

module.exports = {
  getAllUsers: () => users,
  addUser: (user) => {
    users.push(user);
    saveUsers();
  },
  findUserByEmail: (email) => users.find(u => u.email === email),
  validateUser: (email, password) => users.find(u => u.email === email && u.password === password)
};
