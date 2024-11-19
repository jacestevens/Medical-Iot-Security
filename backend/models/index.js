const Device = require('./Device')(sequelize, DataTypes);  // Ensure this is correctly imported
const DeviceStatistics = require('./DeviceStatistics');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:'); // Or your actual database config

module.exports = {
  sequelize,
  Device,
  DeviceStatistics,
};
