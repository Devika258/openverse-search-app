const express = require('express');
const axios = require('axios');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /search/media:
 *   get:
 *     summary: Search images from Openverse API
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search keyword (e.g. 'cat', 'nature')
 *     responses:
 *       200:
 *         description: List of media results
 *       400:
 *         description: Missing query
 *       500:
 *         description: Server error
 */
router.get('/media', async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ message: "Query parameter 'q' is required" });
  }

  try {
    const response = await axios.get(`https://api.openverse.engineering/v1/images`, {
      params: { q }
    });

    return res.json(response.data);
  } catch (error) {
    console.error('Error fetching from Openverse API:', error.message);
    return res.status(500).json({ message: "Error fetching media" });
  }
});

/**
 * @swagger
 * /search/protected:
 *   get:
 *     summary: Test protected route with JWT
 *     tags: [Search]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authorized response
 *       401:
 *         description: Unauthorized or invalid token
 */
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Hello, ${req.user.email}. You are authorized!` });
});

module.exports = router;
