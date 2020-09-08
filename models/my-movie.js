const mongoose = require('mongoose');

const myMovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    img: { type: String },
    imdbID: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

module.exports = mongoose.model('MyMovie', myMovieSchema);