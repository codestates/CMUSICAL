const express = require('express');
const router = express.Router();

const isvalid = require('../controllers/user/isvalid');
const signin = require('../controllers/user/signin');
const signout = require('../controllers/user/signout');
const signup = require('../controllers/user/signup');

router.post('/isvalid', isvalid.post);
router.post('/signin', signin.post);
router.post('/signout', signout.post);
router.post('/signup', signup.post);

module.exports = router;
