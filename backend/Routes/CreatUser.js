const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET || "MynameisYuvrajsandipPise@!"; // Use environment variable or a default value

// Route for user signup
router.post("/createuser", [
    body('email', 'Please enter a valid email').isEmail(),
    body('name', 'Name must be at least 5 characters long').isLength({ min: 5 }),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success,errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await User.create({
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email,
            location: req.body.location // If not using location, remove this line
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Error during user creation:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Route for user login
router.post("/loginuser", [
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Please enter a valid password').isLength({ min: 5 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userData = await User.findOne({ email: req.body.email });
        if (!userData) {
            return res.status(400).json({ errors: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, userData.password);
        if (!isPasswordValid) {
            return res.status(400).json({ errors: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: userData._id }, jwtSecret);
        res.json({ success: true, authToken: token });
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
