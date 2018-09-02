exports.controller = (database) => {
    return {

        // Find a single dog with a dogId
        findOne: (req, res) => {
            var db = database.getDB();

            db.get("SELECT rowid, * FROM ContactInfo", [req.params.UniqueName], (err, row) => {
                if (err) {

                    db.close();
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Dog."
                    });
                }

                if (row) {
                    res.send(row);
                }
                else {

                    db.run("INSERT INTO ContactInfo(FirstName, LastName, Address, KennelName, Email, Mobile, HomeNumber, DogsNSWMemberNumber, Facebook) VALUES (?,?,?,?,?,?,?,?,?);",
                ['', '','','','','','','',''],
                function (err) {
                    if (err) {
                        db.close();
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the Dog."
                        });
                    }

                    else {
                        var row = {FirstName: '', LastName:'', Address: '', KennelName: '', Email: '', Mobile: '', HomeNumber: '', DogsNSWMemberNumber: '', Faceboook: '',rowid: this.lastID };
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
            db.run("UPDATE ContactInfo SET FirstName= ?, LastName = ?, Address = ?, KennelName = ?, Email = ?, Mobile = ?, HomeNumber = ?, DogsNSWMemberNumber = ?, Facebook =? WHERE rowid = ?",
                [
                    req.body.FirstName,
                    req.body.LastName,
                    req.body.Address,
                    req.body.KennelName,
                    req.body.Email,
                    req.body.Mobile,
                    req.body.HomeNumber,
                    req.body.DogsNSWMemberNumber,
                    req.body.Facebook,
                    req.params.contactinfoId
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