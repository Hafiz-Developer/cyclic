const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const scammerController = require('../controllers/scammer');
const authenticate = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
router.post('/create', authenticate , adminMiddleware , upload.array('images', 5), scammerController.uploadScammerImages);

router.get('/all' , scammerController.getAllScammers);

router.delete('/:id', authenticate , adminMiddleware ,scammerController.deleteScammer);

module.exports = router;
