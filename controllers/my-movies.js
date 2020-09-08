const MyMovie = require('../models/my-movie');

module.exports = {
    index,
};

async function index(req, res, next) {
    try {
        const myMovies = await MyMovie.find({ user: req.user });
        res.render('watchlist-home', { myMovies, user: req.user });
    } catch (err) {
        next(err);
    }
}