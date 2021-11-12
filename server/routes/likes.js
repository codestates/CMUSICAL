const express = require('express');
const router = express.Router();

const add = require('../controllers/likes/add');
const get = require('../controllers/likes/get');
const remove = require('../controllers/likes/delete');

router.get('/', get.get);
router.post('/', add.post);
router.delete('/', remove.delete);

module.exports = router;
