const express = require('express');
const router = express.Router();

// Available API Routes.
router.use('/api/v1/users', require('./auth.js'));

module.exports = router;