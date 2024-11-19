const express = require('express');
const Device = require('./models/Device'); // Import the Device model
const DeviceStatistics = require('./models/device_statistics'); // Import the DeviceStatistics model
const { Sequelize } = require("sequelize");

const dashboardRouter = express.Router();

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

// Base route for testing
dashboardRouter.get('/', (req, res) => {
  res.send('Dashboard API is working!');
});

// Route to fetch device data
dashboardRouter.get('/data', async (req, res) => {
  try {
    console.log('Device model:', Device);
    console.log('Device findAll:', Device.findAll);
    // Fetch all devices
    const devices = await Device.findAll(); // Fetch devices from the Device table

    // Fetch the latest device statistics
    const latestStats = await DeviceStatistics.findOne({
      order: [["id", "DESC"]], // Ensure you get the latest statistics
    });

    // Prepare the response data
    const deviceData = {
      totalDevices: latestStats ? latestStats.total_devices : 0, // Use latest statistics
      iotDevices: latestStats ? latestStats.iot_devices : 0,
      activeAlerts: latestStats ? latestStats.active_alerts : 0,
      vulnerabilities: latestStats ? latestStats.vulnerabilities : 0,
      deviceDetails: devices.map(device => ({
        id: device.id,
        name: device.name,
        type: device.type,
        operatingSystem: device.operating_system,
        atRisk: device.at_risk,
      })),
    };
    
    res.json(deviceData); // Respond with combined device and statistics data
  } catch (error) {
    console.error("Error fetching devices:", error);
    res.status(500).json({ message: "Error fetching devices" });
  }
});

// Route to fetch the latest device statistics
dashboardRouter.get("/statistics", async (req, res) => {
  try {
    const latestStats = await DeviceStatistics.findOne({
      order: [["id", "DESC"]],
    });

    if (!latestStats) {
      return res.status(404).json({ message: "No device statistics found" });
    }

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

// Export the router
module.exports = dashboardRouter;