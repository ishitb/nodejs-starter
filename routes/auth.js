const router = require('express').Router();
const authController = require('../controllers/auth');

router.post('/register', authController.auth_register);
router.post('/login', authController.auth_login);

module.exports = {
    router,
};
