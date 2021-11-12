const express = require('express');
const router = express.Router();

const add = require('../controllers/favorites/add');
const get = require('../controllers/favorites/get');
const remove = require('../controllers/favorites/delete');

router.get('/', get.get);
router.post('/', add.post);
router.delete('/', remove.delete);

module.exports = router;
