const express = require('express');
const router = express.Router();

const add = require('../controllers/comment/add');
const remove = require('../controllers/comment/remove');
const edit = require('../controllers/comment/edit');
const get = require('../controllers/comment/get');

router.post('/add', add.post);
router.post('/remove', remove.post);
router.post('/edit', edit.post);
router.get('/', get.get);

module.exports = router;
