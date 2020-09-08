var express = require('express');
var router = express.Router();
var indexCtrl = require('../controllers/index');
var omdbCtrl = require('../controllers/api/omdb');
const myMoviesApiCtrl = require('../controllers/api/my-movies');
const myMoviesCtrl = require('../controllers/my-movies');
const isLoggedIn = require('../middleware/isLoggedIn');


router.get('/', indexCtrl.index);
router.get('/watchlist', isLoggedIn, myMoviesCtrl.index);

//api routers
router.get('/api/search', omdbCtrl.search);
router.post('/api/my-movies', isLoggedIn, myMoviesApiCtrl.create);
router.delete('/api/my-movies/:id', isLoggedIn, myMoviesApiCtrl.deleteOne);

module.exports = router;