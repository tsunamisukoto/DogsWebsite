const mongoose = require('mongoose');

const Announcement = mongoose.Schema({
    Title: String,
    Content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Announcement', Announcement);