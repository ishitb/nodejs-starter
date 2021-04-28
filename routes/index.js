const router = require('express').Router();

const { authenticate } = require('../middleware/auth');
const homeRoute = require('./home').router;
const blogRoute = require('./blogs').router;
const authRoute = require('./auth').router;

router.use('/', homeRoute);
router.use('/blogs', authenticate, blogRoute); // authenticate is middleware to require authentication for all blog routes
router.use('/auth', authRoute);

module.exports = {
    router,
};
