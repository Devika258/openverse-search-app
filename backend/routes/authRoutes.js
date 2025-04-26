const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// File path to persist users
const usersFilePath = path.join(__dirname, '../data/users.json');

// Load users from file if exists
let users = [];
try {
  if (fs.existsSync(usersFilePath)) {
    users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
  }
} catch (err) {
  console.error('Failed to load users from file:', err);
}

// Save users to file
const saveUsers = () => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Failed to save users to file:', err);
  }
};

// Health/test route
router.get('/test', (req, res) => {
  res.send('Auth route is working!');
});

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: All fields are required
 *       409:
 *         description: User already exists
 */
router.post('/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Validation
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required: firstName, lastName, email, password' });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existingUser = users.find(user => user.email === normalizedEmail);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const newUser = { firstName, lastName, email: normalizedEmail, password };
  users.push(newUser);
  saveUsers();

  console.log(`Registered user: ${firstName} ${lastName} (${normalizedEmail})`);

  return res.status(201).json({
    message: 'User registered successfully!',
    user: { firstName, lastName, email: normalizedEmail }
  });
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logs in a user and returns a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token returned
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const normalizedEmail = email.toLowerCase().trim();
  const user = users.find(u => u.email === normalizedEmail && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ email: normalizedEmail }, 'your_secret_key', { expiresIn: '1h' });
  return res.status(200).json({ token });
});

module.exports = router;
