exports.controller = (database) => {
    return {
        // Create and Save a new Dog
        create: (req, res) => {
            // Validate request


            var db = database.getDB();
            db.run("INSERT INTO Links(Title,Content, URL, date_created) VALUES (?,?,?, DATETIME('now'));",
                [req.body.Title, req.body.Content, req.body.URL],
                function (err) {
                    db.close();
                    if (err)
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the Link."
                        });
                    else
                    {
                        res.send(req.body);

                    }

                });

        },

        // Retrieve and return all dogs from the database.
        findAll: (req, res) => {
            var db = database.getDB();

            db.all("SELECT rowid, Title, Content, URL FROM Links", [], (err, rows) => {
                db.close();
                if (err)
                    throw err;
                res.send(rows);
            });
        },
        // Delete a dog with the specified dogId in the request
        del: (req, res) => {
            var db = database.getDB();

            db.run("DELETE FROM Links WHERE rowid = ?", [req.params.linkId],
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