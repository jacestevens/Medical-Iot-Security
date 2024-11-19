const express = require('express');
const Device = require('./Device');
const router = express.Router();

// Define routes (example for fetching devices)
router.get('/devices', async (req, res) => {
  try {
    const devices = await Device.findAll();
    res.json(devices);
  } catch (error) {
    console.error('Error fetching devices:', error);
    res.status(500).json({ message: 'Error fetching devices' });
  }
});

module.exports = router;
