const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/create', (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid token' });
        // Dummy certificate creation
        res.json({ message: 'Certificate created', user: decoded.email });
    });
});

router.get('/list', (req, res) => {
    res.json({ certificates: ['Cert1', 'Cert2', 'Cert3'] });
});

module.exports = router;
