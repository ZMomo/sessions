const { login, register, checkLoginStatus, logout, checkSession } = require('../controllers/auth');

const router = require('express-promise-router')();

router.route('/register')
    .post(register);

router.route('/login')
    .get(checkLoginStatus)
    .post(login);

router.route('/logout')
    .get(checkSession, logout);

router.route('/protect')

module.exports = router;
