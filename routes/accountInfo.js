const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createAccountInfo, getAllAccountInfo } = require('../controllers/accountInfo');
const authenticate = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});
const upload = multer({ storage });

router.post('/create', authenticate , upload.single('accountPic'), createAccountInfo);
router.get('/all', authenticate , adminMiddleware , getAllAccountInfo);

module.exports = router;
