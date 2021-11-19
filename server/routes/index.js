const express = require('express');
const router = express.Router();

const commentRouter = require('./comment');
const contentsRouter = require('./contents');
const userRouter = require('./user');
const myinfoRouter = require('./myinfo');
const favoritesRouter = require('./favorites');
const likesRouter = require('./likes');
const adminRouter = require('./admin');
const authRouter = require('./auth');

router.use('/comment', commentRouter);
router.use('/', contentsRouter);
router.use('/user', userRouter);
router.use('/user/myinfo', myinfoRouter);
router.use('/favorites', favoritesRouter);
router.use('/likes', likesRouter);
router.use('/kopis/getitems', adminRouter);
router.use('/auth', authRouter);

module.exports = router;
