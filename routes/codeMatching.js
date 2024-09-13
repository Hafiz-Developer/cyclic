const express = require('express');
const router = express.Router();
const { createCodeMatching, getAllCodeMatchings } = require('../controllers/codeMatching');
const authenticate = require('../middlewares/authMiddleware'); 
const adminMiddleware = require('../middlewares/adminMiddleware');

router.post('/create',authenticate , createCodeMatching);
router.get('/all',authenticate , adminMiddleware , getAllCodeMatchings);

module.exports = router;
