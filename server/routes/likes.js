const express = require('express');
const router = express.Router();

const add = require('../controllers/likes/add');
const get = require('../controllers/likes/get');
const remove = require('../controllers/likes/remove');

router.post('/add', add.post);
router.get('/', get.get);
router.post('/remove', remove.post);

module.exports = router;
