const express = require('express');
const router = express.Router();

const isAuth = require('../controllers/user/auth');

router.get('/', isAuth.auth);

module.exports = router;
