const express = require("express");
const router = express.Router();

const users = [];

// REGISTER
router.post("/register", (req, res) => {
    const { username, password } = req.body;

    const existingUser = users.find(
        u => u.username === username
    );

    if (existingUser) {
        return res.json({
            message: "User already exists"
        });
    }

    users.push({
        username,
        password
    });

    res.json({
        message: "User registered successfully"
    });
});

// LOGIN
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        u => u.username === username &&
             u.password === password
    );

    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }

    res.json({
        message: "Login successful"
    });
});

module.exports = router;