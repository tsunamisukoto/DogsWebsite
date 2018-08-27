const mongoose = require('mongoose');

const ContactInfo = mongoose.Schema({
    FirstName: String,
    KennelName: String,
    Address: String,
    LastName: String,
    Email: String,
    Mobile: String,
    HomeNumber: String,
    DogsNSWMemberNumber: String,
    Website: String,
    Facebook: String
}, {
    timestamps: true
});

module.exports = mongoose.model('ContactInfo', ContactInfo);