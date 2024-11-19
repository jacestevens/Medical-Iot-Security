const express = require('express');
const bodyParser = require('body-parser');
const Device = require('./Device'); // Ensure correct import

const router = express.Router();
router.use(bodyParser.json());

// Define the add-device route
router.post('/add-device', async (req, res) => {
  const { name, type, operating_system, at_risk } = req.body;
  console.log('Received:', req.body);

  if (!name || !type || !operating_system) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  try {
    const newDevice = await Device.create({
      name,
      type,
      operating_system,
      at_risk: at_risk === 'true', // Ensure boolean value
    });

    res.status(201).json({ message: 'Device added successfully!', newDevice });
  } catch (err) {
    console.error('Error adding device:', err);
    res.status(500).json({ message: 'Error adding device.' });
  }
});

module.exports = router; // Export the router
