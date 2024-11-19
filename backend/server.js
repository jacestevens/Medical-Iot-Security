require('dotenv').config({ path: 'key.env' });
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const router = require('./models/router'); // Adjust the path to your router file
const { Device } = require('./models/Device');
const addDeviceRouter = require('./models/add-device');


// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Enable Cross-Origin Requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Initialize SQLite with Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Path to the SQLite database file
});



sequelize.sync().then(() => {
  console.log('Database synced');
}).catch(err => {
  console.error('Error syncing database:', err);
});

// Register route
app.post('/register', async (req, res) => {
  const { name, company, email, password } = req.body;

  if (!name || !company || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, company, email, password: hashedPassword });

    res.status(201).json({ message: 'Registration successful!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error during registration' });
  }
});

// Login route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful!' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
});

// Import and mount the dashboard router
const dashboardRouter = require('./dashboard'); // Adjust the path accordingly
app.use('/api/dashboard', dashboardRouter);

const DeviceStatistics = sequelize.define("device_statistics", {
  total_devices: { type: DataTypes.INTEGER, allowNull: false },
  iot_devices: { type: DataTypes.INTEGER, allowNull: false },
  active_alerts: { type: DataTypes.INTEGER, allowNull: false },
  vulnerabilities: { type: DataTypes.INTEGER, allowNull: false },
});



dashboardRouter.get("/", async (req, res) => {
  try {
    // Fetch the most recent statistics entry
    const latestStats = await DeviceStatistics.findOne({
      order: [["id", "DESC"]], // Ensure the latest row is retrieved
    });

    if (!latestStats) {
      return res.status(404).json({ message: "No device statistics found" });
    }

    // Respond with the data
    res.json({
      totalDevices: latestStats.total_devices,
      iotDevices: latestStats.iot_devices,
      activeAlerts: latestStats.active_alerts,
      vulnerabilities: latestStats.vulnerabilities,
    });
  } catch (error) {
    console.error("Error fetching device statistics:", error);
    res.status(500).json({ message: "Error fetching device statistics" });
  }
});


app.get('/api/devices', async (req, res) => {
  try {
    const devices = await Device.findAll();
    res.json(devices);
  } catch (error) {
    console.error('Error fetching devices:', error);
    res.status(500).json({ message: 'Error fetching devices' });
  }
});

app.use('/api', addDeviceRouter); // Add `/api/add-device` route




module.exports = dashboardRouter;

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

module.exports = app;
