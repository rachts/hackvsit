const express = require('express');
const router = express.Router();
const { initDatabase } = require('../controllers/initController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, admin, initDatabase);

module.exports = router;
