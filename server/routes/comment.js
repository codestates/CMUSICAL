const express = require('express');
const router = express.Router();

const add = require('../controllers/comment/add');
const remove = require('../controllers/comment/delete');
const edit = require('../controllers/comment/patch');
const get = require('../controllers/comment/get');

router.post('/', add.post);
router.delete('/', remove.delete);
router.patch('/', edit.patch);
router.get('/', get.get);

module.exports = router;
