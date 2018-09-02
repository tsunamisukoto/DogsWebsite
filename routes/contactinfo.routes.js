module.exports = (app, db) => {
    const contacts = require("./controllers/contactinfo.controller.js").controller(db);

    const authenticated = require('../modules/Authenticated.js');
    app.get("/contact/", contacts.findOne);
    app.put("/contact/:contactinfoId", authenticated.authenticationRequired(contacts.update));
}