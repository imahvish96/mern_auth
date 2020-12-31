const { Router } = require('express');
const router = Router();
const privateRouter = require('./privateRoute');
const { login_get, signup_get, signup_post, login_post, dashboard_get, logout_get } = require('../controller/authController');

router.get('/login', login_get);
router.get('/signup', signup_get);
router.post('/signup', signup_post);
router.post('/login', login_post);
router.get('/dashboard', privateRouter, dashboard_get);
router.get('/logout', logout_get);

module.exports = router;
