require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function(req, res, next) {
    if (!req.headers.authorization) {
        console.log('no authorization');
        return res.status(403).json({ error: 'This endpoint requires Auth Header' });
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(403).json({ error: 'This token is not valid' });
        } else {
            req.jwtDecoded = { ...decoded };
            req.userId = req.jwtDecoded.userId;
            next();
        }
    });
};