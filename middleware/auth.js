const jwt = require("jsonwebtoken");

const SECRET = "mysecretkey";

function auth(req, res, next) {

    console.log(req.headers);

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.json({ message: "Invalid token" });
    }
}

module.exports = auth;