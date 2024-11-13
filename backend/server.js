require('dotenv').config({ path: 'key.env' });

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();

// Enable Cross-Origin Requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Initialize SQLite with Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Path to the SQLite database file
});

// Define the User model
const User = sequelize.define('User ', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync the database (creates tables if they don't exist)
sequelize.sync().then(() => console.log('Database synced'));

// Register route
app.post('/register', async (req, res) => {
  const { name, company, email, password } = req.body;

  if (!name || !company || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if a user already exists with the same email
    const existingUser  = await User.findOne({ where: { email } });
    if (existingUser ) {
      return res.status(400).json({ message: "User  already exists with this email" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds of salt

    // Create a new user if no existing one
    await User.create({ name, company, email, password: hashedPassword });
    
    res.status(201).json({ message: 'Registration successful!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error during registration' });
  }
});

// Login route
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body; // Get email and password from request body

  try {
    const user = await User.findOne({ where: { email:email } });
    if (!user) {
      console.error('User  not found');
      return res.status(400).json({ message: "User  not found" });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error('Password mismatch');
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Successfully authenticated
    res.json({ message: "Login successful!" });
  } catch (error) {
    console.error("Error during login:", error);  // Log detailed error
    res.status(500).json({ message: "An error occurred. Please try again" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));