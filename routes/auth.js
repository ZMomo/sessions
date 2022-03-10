const { login, register, checkLoginStatus, logout } = require('../controllers/auth');

const router = require('express-promise-router')();

router.route('/register')
    .post(register);

router.route('/login')
    .get(checkLoginStatus)
    .post(login);

router.route('/logout')
    .get(checkLoginStatus, logout);

router.route('/protect')

module.exports = router;
