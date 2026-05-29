const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const users = require("../users");

// LOGIN ROUTE
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        return res.json({ message: "User not found" });
    }

    const token = jwt.sign(
        { username: user.username },
        "mysecretkey"
    );

    res.json({
        message: "Login successful",
        token
    });
});

module.exports = router;