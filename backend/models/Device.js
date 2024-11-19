const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Path to the SQLite database
});

// Define the Device model
const Device = sequelize.define('Device', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  operating_system: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  at_risk: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
 }, {
    timestamps: true, 
  });



// Export the Device model
module.exports = Device;
