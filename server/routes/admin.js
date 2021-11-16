const express = require('express');
const router = express.Router();

const getitems = require('../kopis');

router.get('/', getitems.getApiData);

module.exports = router;
