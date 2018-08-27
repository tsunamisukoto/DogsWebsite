const mongoose = require('mongoose');

const Link = mongoose.Schema({
    Title: String,
    Content: String,
    URL: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Link', Link);