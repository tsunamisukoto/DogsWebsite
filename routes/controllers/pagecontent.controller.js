exports.controller = (database) => {
    return {

        // Find a single dog with a dogId
        findOne: (req, res) => {
            var db = database.getDB();

            db.get("SELECT rowid, Title, Content, UniqueName FROM PageContents WHERE UniqueName = ?", [req.params.UniqueName], (err, row) => {
                if (err)
                {

                    db.close();
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Dog."
                    });
                }
                  
                if (row) {
                    res.send(row);
                }
                else {

                    db.run("INSERT INTO PageContents(Title, Content, UniqueName) VALUES (?,?,?);",
                ['', '', req.params.UniqueName],
                function (err) {
                    if (err) {
                        db.close();
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the Dog."
                        });
                    }

                    else {
                        var row = { Title: '', Content: '', UniqueName: req.params.UniqueName, rowid: this.lastID };
                        db.close();
                        res.send(row);

                    }

                });

                }
            });
        },

        // Update a dog identified by the dogId in the request
        update: (req, res) => {
            // Find dog and update it with the request body
            var db = database.getDB();
            db.run("UPDATE PageContents SET Title = ?, Content = ? WHERE rowid = ?",
                [
                    req.body.Title,
                    req.body.Content,
                    req.params.pagecontentId
                ],
                function (err) {
                    db.close();
                    if (err)
                        res.status(500).send({
                            message: err.message || "Some error occurred while removing the Dog."
                        });
                    else
                        res.status(200).send(req.body);
                });
        }
    }
}