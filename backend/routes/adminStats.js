const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Upload = require('../models/upload'); // ✅ Update this path if your Upload model is named differently

// Get total users
router.get('/users', async (req, res) => {
  try {
    const count = await User.countDocuments({ role: 'user' });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Failed to count users' });
  }
});

// Get total admins
router.get('/admins', async (req, res) => {
  try {
    const count = await User.countDocuments({ role: 'admin' });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Failed to count admins' });
  }
});

// Get total uploads
router.get('/uploads', async (req, res) => {
  try {
    const count = await Upload.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Failed to count uploads' });
  }
});

// Get recent uploads
router.get('/uploads/recent', async (req, res) => {
  try {
    const uploads = await Upload.find().sort({ createdAt: -1 }).limit(5);
    res.json({ uploads });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recent uploads' });
  }
});

module.exports = router;
