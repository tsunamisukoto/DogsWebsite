module.exports = (app) => {
    const contacts = require("./controllers/pagecontent.controller.js");
    const authenticated = require('../modules/Authenticated.js');


    app.get("/pagecontent/:UniqueName", contacts.findOne);
    app.put("/pagecontent/:pagecontentId", authenticated.authenticationRequired(contacts.update));
}