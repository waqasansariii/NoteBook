const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');

const JWT_SECRET = 'Waqasisagood$oy';

// ✅ Route 1: Create a new user (POST "/api/auth/createuser") - No login required
router.post('/createuser', [
    body('name', 'Name must be at least 3 characters').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    try {
        // Check if user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "User already exists with this email" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create new user
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        await user.save();

        // Generate JWT token
        const payload = { user: { id: user.id } };
        const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        success = true;

        res.json({ success,authtoken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Route 2: Login user (POST "/api/auth/login") - No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be empty').exists()
], async (req, res) => {
    let success = false;
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Find user by email
        let user = await User.findOne({ email });
        if (!user) {
            const success = false;
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Compare passwords
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            const success = false;
            return res.status(400).json({success, error: "Invalid credentials" });

        }

        // Generate JWT token
        const payload = { user: { id: user.id } };
        
        const data = {
            user:{
                id: user.id,
                
            }
        }
        const authtoken = jwt.sign(payload, JWT_SECRET);
        const success = true;

        res.json({success, authtoken });

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Route 3: Get logged-in user details (POST "/api/auth/getuser") - Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        // Fetch user details excluding password
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
