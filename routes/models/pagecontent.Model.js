const mongoose = require('mongoose');

const PageContent = mongoose.Schema({
    Title: String,
    Content: String,
    UniqueName: String
}, {
    timestamps: true
});

module.exports = mongoose.model('PageContent', PageContent);