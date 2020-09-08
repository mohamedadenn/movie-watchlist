var express = require('express');
var router = express.Router();
var indexCtrl = require('../controllers/index');
var omdbCtrl = require('../controllers/api/omdb');

/* GET home page. */
router.get('/', indexCtrl.index);

router.get('/api/search', omdbCtrl.search);


module.exports = router;