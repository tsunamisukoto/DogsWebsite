module.exports = (app, db) => {
    const contacts = require("./controllers/pagecontent.controller.js").controller(db);
    const authenticated = require('../modules/Authenticated.js');


    app.get("/pagecontent/:UniqueName", contacts.findOne);
    app.put("/pagecontent/:pagecontentId", authenticated.authenticationRequired(contacts.update));
}