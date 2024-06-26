// import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import { hashPassword } from '../helpers/authHelper.js';
import { comparePassword, generateToken } from '../helpers/authHelper.js';

export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find(); // Get all users
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
    }
  };

  export const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user with the email exists already
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create a new user
        const newUser = new User({ email, password: hashedPassword, role: 'user' });
        await newUser.save();

        // Create a user object with selected fields to return
        const userToReturn = {
            _id: newUser._id,
            email: newUser.email,
            role: newUser.role
            // any other fields you deem safe to return
        };

        res.status(201).json({ success: true, message: 'User registered successfully', user: userToReturn });
    } catch (error) {
        console.log('Error creating user', error);
        res.status(500).json({ message: 'Error creating user' });
    }
};

export const adminLogin = (req, res) => {
    const { username, password } = req.body;
  
    // Replace with your actual admin credentials and authentication logic
    const adminUsername = 'admin';
    const adminPassword = 'admin234';
  
    if (username === adminUsername && password === adminPassword) {
      // Authentication successful
      res.json({ success: true, message: 'Admin login successful' });
    } else {
      // Authentication failed
      res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }
  };

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password.' });

        const validPassword = await comparePassword(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid email or password.' });

        // Generate token with user's ID and role
        const token = generateToken(user._id, user.role);

        // Send token and role back to frontend
        res.json({ token, role: user.role });

    } catch (error) {
        console.error('Error during login', error);
        res.status(500).json({ message: 'Error during login' });
    }
};
