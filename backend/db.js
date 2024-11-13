const { Sequelize } = require('sequelize');

// Initialize a SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Database file location within the project
});

module.exports = sequelize;