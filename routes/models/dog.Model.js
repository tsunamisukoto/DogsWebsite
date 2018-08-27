const mongoose = require('mongoose');

const DogSchema = mongoose.Schema({
    Name: String,
    Category: String,
    Nickname: String,
    Grading: String,
    Achievements: [
        {
            Grouping: String,
            Achievements: [
                { Name: String }
            ]
        }
    ],
    Sire: {
        Name: String,
        Grading: String,
        Nickname: String
    },
    Dame: {
        Name: String,
        Grading: String,
        Nickname: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Dog', DogSchema);