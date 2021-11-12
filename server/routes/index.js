const express = require('express');
const router = express.Router();

const commentRouter = require('./comment');
const contentsRouter = require('./contents');
const userRouter = require('./user');
const myinfoRouter = require('./myinfo');
const favoritesRouter = require('./favorites');
const likesRouter = require('./likes');

router.use('/comment', commentRouter);
router.use('/', contentsRouter);
router.use('/user', userRouter);
router.use('/user/myinfo', myinfoRouter);
router.use('/favorites', favoritesRouter);
router.use('/likes', likesRouter);

module.exports = router;
