const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// ✅ GET /auth/test
router.get('/test', (req, res) => {
  console.log("GET /auth/test hit");
  res.send('Auth route is working!');
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logs in a user and returns a JWT token
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
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Hardcoded credentials for demo
  if (email === "test@example.com" && password === "password") {
    const token = jwt.sign({ email }, 'your_secret_key', { expiresIn: '1h' });
    return res.json({ token });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
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
 *         description: Invalid input
 */
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required: firstName, lastName, email, password' });
  }

  console.log(`✅ Registered user: ${firstName} ${lastName} (${email})`);

  return res.status(201).json({
    message: 'User registered successfully!',
    user: { firstName, lastName, email }
  });
});

module.exports = router;
