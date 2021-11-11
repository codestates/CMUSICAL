const express = require('express');
const router = express.Router();

const edit = require('../controllers/user/myinfo/edit');
const get = require('../controllers/user/myinfo/get');
const remove = require('../controllers/user/myinfo/remove');

router.get('/', get.get);
router.post('/edit', edit.post);
router.post('/remove', remove.post);

module.exports = router;
