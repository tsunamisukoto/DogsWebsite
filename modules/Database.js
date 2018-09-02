const sqlite3 = require("sqlite3");

module.exports = {
    getDB: () => {
        var db = new sqlite3.Database("./dogs.db");
        return db;
    },
    init: () => {
        var db = new sqlite3.Database("./dogs.db");
        db.on("error", function (error) {
            console.log("Getting an error : ", error);
        });

        db.run('CREATE TABLE IF NOT EXISTS Dogs(\
            Name text,\
            Nickname text,\
            Grading text,\
            Sire text,\
            Dame text,\
            Achievements text,\
            Category text,\
            date_created text);', [], function (error) {
                if (error)
                    console.log(error);
            });
        db.run('CREATE TABLE IF NOT EXISTS PageContents(\
            Title text,\
            Content text,\
            UniqueName text);',
        [], function (error) {
            if (error)
                console.log(error);
        });

        db.run('CREATE TABLE IF NOT EXISTS Announcements(\
            Title text,\
            Content text,\
            date_created text);', [], function (error) {
                if (error)
                    console.log(error);
            });

        db.run('CREATE TABLE IF NOT EXISTS Links(\
            Title text,\
            Content text,\
            URL text,\
            date_created text);', [], function (error) {
                if (error)
                    console.log(error);
            });
        db.run('CREATE TABLE IF NOT EXISTS ContactInfo(\
            FirstName text,\
            LastName text,\
            Address text,\
            KennelName text,\
            Email text,\
            Mobile text,\
            HomeNumber text,\
            DogsNSWMemberNumber text,\
            Facebook text);', [], function (error) {
                if (error)
                    console.log(error);
            });

    }
}