const express = require('express');
const router = express.Router();

const add = require('../controllers/likes/add');
const remove = require('../controllers/likes/delete');

router.post('/', add.post);
router.delete('/', remove.delete);

module.exports = router;
