const express = require('express');

const {
    register,
    login,
    logout,
    getMe,
    updateDetails

} = require('../controllers/auth');

const { registerRules, loginRules, updateDetailsRules } = require('../middleware/authMiddleware');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', registerRules()  ,register);
router.post('/login',loginRules() ,login);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetailsRules(),updateDetails);

module.exports = router;