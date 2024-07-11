const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const jwt=require("jsonwebtoken");

const bcrypt = require('bcryptjs');

const jwtSecret = "MynameisAfiaAdilahProjectnameisCentralPerk$3"
router.post("/creatuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if user with the same email already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: "User with this email already exists" }] });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);

        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location || "" // Default to empty string if location is not provided
        });
        res.json({ success: true });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
        let userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, userData.password);
        if (!passwordMatch) {
            return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
        }
        const data={
            user:{
                id:userData.id
            }

        }
        const authToken=jwt.sign(data,jwtSecret)
        return res.json({ success: true,authToken:authToken });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
