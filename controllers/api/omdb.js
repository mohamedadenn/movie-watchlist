const axios = require('axios');
const MyMovie = require('../../models/my-movie');

module.exports = {
    search,
};

async function search(req, res) {
    const searchQuery = req.query.q //this returns the search box input

    try {
        const response = await axios.get(
            `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${searchQuery}`
        );
        if (!req.user) {
            const movies = response.data.Search.map((movie) => formatMovie(movie, false));
            return res.json(movies);
        }

        const imdbIds = response.data.Search.map((movie) => movie.imdbID);
        const myMatchingMovies = await MyMovie.find({ imdbID: { $in: imdbIds }, user: req.user }, { imdbID: 1, _id: 0 });
        const myMatchingImbdIds = myMatchingMovies.map((myMovie) => myMovie.imdbID);
        const movies = response.data.Search.map((movie) =>
            formatMovie(movie, myMatchingImbdIds.includes(movie.imdbID))
        );
        res.json(movies);
    } catch (err) {
        console.error(err);
        if (err.response) {
            return res.status(err.response.status).json(err.response.data);
        }
        return res.status(500).json({ message: 'Server Error' });
    }
}

function formatMovie(omdbMovie, inMyMovies) {
    return {
        title: omdbMovie.Title,
        img: omdbMovie.Poster,
        imdbID: omdbMovie.imdbID,
        inMyMovies,
    };
}