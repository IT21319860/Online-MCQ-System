const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Mock login: creates or returns user by email
router.post('/login', async (req, res) => {
  const { name, email } = req.body;
  let user = await User.findOne({ email });
  if (!user) user = await User.create({ name, email });
  res.json(user);
});

module.exports = router;
