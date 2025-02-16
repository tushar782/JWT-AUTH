const express = require('express');
const verifyToekn = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware')

const router = express.Router();

// Only Admin can access this router
router.get('/admin', verifyToekn, authorizeRoles("admin"), (req, res) => {
    res.json({ message: `Welcome Admin` });
});

// Both Admin and Manager can access this router
router.get('/manager', verifyToekn, authorizeRoles("admin", "manager"), (req, res) => {
    res.json({ message: `Welcome Manager` });
});

// All can access this route
router.get('/user', verifyToekn, authorizeRoles("admin", "manager", "user"), (req, res) => {
    res.json({ message: `Welcome User` });
})
module.exports = router;