exports.controller = (database) => {
    MapDogToSQL = function (s) {

        if (s.Sire)
            s.Sire = JSON.stringify(s.Sire);
        if (s.Dame)
            s.Dame = JSON.stringify(s.Dame);
        if (s.Achievements)
            s.Achievements = JSON.stringify(s.Achievements);
        
        return s;

    };
    MapSQLToDog = function (s) {
        if (s.Sire)
            s.Sire = JSON.parse(s.Sire);
        if (s.Dame)
            s.Dame = JSON.parse(s.Dame);
        if (s.Achievements)
            s.Achievements = JSON.parse(s.Achievements);
        return s;
    }
    return {
        // Create and Save a new Dog
        create: (req, res) => {
            // Validate request
            if (!req.body.Name) {
                return res.status(400).send({
                    message: "Dog Name can not be empty"
                });
            }
            var db = database.getDB();
            //var insert = db.prepare("INSERT INTO Dogs(Name, Nickname, Grading, Sire, Dame, Achievements) VALUES ($);", (err) => { if (err) throw err; });
            var dbDog = MapDogToSQL(req.body);
            var dog = [dbDog.Name, dbDog.Nickname, dbDog.Grading, JSON.stringify(dbDog.Sire), JSON.stringify(dbDog.Dame), JSON.stringify(dbDog.Achievements), dbDog.Category];
            db.run("INSERT INTO Dogs(Name, Nickname, Grading, Sire, Dame, Achievements, Category, date_created) VALUES (?,?,?,?,?,?,?, DATETIME('now'));",
                dog,
                function (err) {
                    db.close();
                    if (err)
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the Dog."
                        });
                    else
                        res.send(req.body);

                });

        },

        // Retrieve and return all dogs from the database.
        findAll: (req, res) => {
            var db = database.getDB();
             
            db.all("SELECT rowid, Name, Nickname, Grading, Sire, Dame, Achievements FROM Dogs WHERE Category = ?", [req.params.category], (err, rows) => {
                db.close();
                if (err)
                    throw err;
                for (var i = 0; i < rows.length; i++) {
                    rows[i] = MapSQLToDog(rows[i]);
                }
                res.send(rows);
            });
        },

        // Find a single dog with a dogId
        findOne: (req, res) => {
            var db = database.getDB();

            db.get("SELECT rowid, Name, Nickname, Grading, Sire, Dame, Achievements FROM Dogs WHERE rowId = ?", [req.params.dogId], (err, row) => {
                db.close();
                if (err)
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Dog."
                    });
                res.send(MapSQLToDog(row));
            });
        },

        // Update a dog identified by the dogId in the request
        update: (req, res) => {
            // Find dog and update it with the request body
            var db = database.getDB();

            //var insert = db.prepare("INSERT INTO Dogs(Name, Nickname, Grading, Sire, Dame, Achievements) VALUES ($);", (err) => { if (err) throw err; });
            var dbDog = MapDogToSQL(req.body);
            db.run("UPDATE Dogs SET Name = ?, Nickname = ?, Grading = ?, Sire = ?, Dame = ?, Achievements = ? WHERE rowid = ?",
                [
                    dbDog.Name,
                    dbDog.Nickname,
                    dbDog.Grading,
                    dbDog.Sire,
                    dbDog.Dame,
                    dbDog.Achievements,
                    req.params.dogId
                ],
                function (err) {
                    db.close();
                    if (err)
                        res.status(500).send({
                            message: err.message || "Some error occurred while removing the Dog."
                        });
                    else
                        res.status(200).send({
                            message: "Updated successfully"
                        });
                });
        },

        // Delete a dog with the specified dogId in the request
        del: (req, res) => {
            var db = database.getDB();

            db.run("DELETE FROM Dogs WHERE rowid = ?", [req.params.dogId],
                function (err) {
                    db.close();
                    if (err)
                        res.status(500).send({
                            message: err.message || "Some error occurred while removing the Dog."
                        });
                    else
                        res.status(200).send({
                            message: "Deleted successfully"
                        });
                });
        }
    }
}