const authenticateToken = require('../middleware/authMiddleware'); // ✅ Import

const express = require('express');
const axios = require('axios');

const router = express.Router();

// ✅ Public route
router.get('/media', async (req, res) => {
    try {
        const { query } = req.query;
        const response = await axios.get(`https://api.openverse.engineering/v1/images/?q=${query}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching media" });
    }
});

// ✅ Protected route
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: `Hello, ${req.user.email}. You are authorized!` });
});

module.exports = router;
