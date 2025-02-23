const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Waqasisagood$oy'

const fetchuser = (req, res, next) => {
    // Get the token from the header
    const token = req.header('auth-token');

    // If no token, return unauthorized error
    if (!token) {
        return res.status(401).json({ error: "Access denied! Please authenticate using a valid token." });
    }

    try {
        // Verify the token
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user; // Attach user data to request object
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token! Please authenticate using a valid token." });
    }
};

module.exports = fetchuser;
