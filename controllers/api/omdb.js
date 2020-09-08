const axios = require('axios');


async function search(req, res) {
    let searchQuery = req.query.q
    try {
        let response = await axios.get(
            `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${searchQuery}`)
    } catch (err) {
        console.error(err);
        if (err.response) {
            res.status(err.response.status).json(err.response.data);
        }
        return res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {
    search,
};