const express = require('express');
const router = express.Router();
const { registerUser, allUsers, authUser } = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').post(registerUser).get(protect, allUsers);
router.post('/login', authUser);

module.exports = router;