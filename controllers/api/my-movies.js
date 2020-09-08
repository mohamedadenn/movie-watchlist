const MyMovie = require('../../models/my-movie');

module.exports = {
    create,
    deleteOne,
};

//Adding Movie to your List
function create(req, res, next) {
    req.body.user = req.user;
    MyMovie.create(req.body)
        .then((movie) => res.json(movie))
        .catch((err) => next(err));
}

//Removing movie from your list
function deleteOne(req, res, next) {
    MyMovie.findOneAndRemove({ _id: req.params.id, user: req.user })
        .then((removedMovie) => res.json(removedMovie._id))
        .catch((err) => next(err));
}