const express = require('express');
const router = express.Router();

const getitem = require('../controllers/contents/getitem');
const getitems = require('../controllers/contents/getitems');

router.get('/getitem', getitem.get);
router.get('/getitems', getitems.get);

module.exports = router;
