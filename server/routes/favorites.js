const express = require('express');
const router = express.Router();

const add = require('../controllers/favorites/add');
const get = require('../controllers/favorites/get');
const remove = require('../controllers/favorites/remove');

router.get('/', get.get);
router.post('/add', add.post);
router.post('/remove', remove.post);

module.exports = router;
