const express = require('express');
const router = express.Router();

const edit = require('../controllers/user/myinfo/patch');
const get = require('../controllers/user/myinfo/get');
const remove = require('../controllers/user/myinfo/delete');

router.get('/', get.get);
router.patch('/', edit.patch);
router.delete('/', remove.delete);

module.exports = router;
