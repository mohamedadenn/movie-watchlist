const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatar: String,
    googleId: String
}, {
    timestamps: true,
    runSettersOnQuery: true,
});


module.exports = mongoose.model('User', userSchema);