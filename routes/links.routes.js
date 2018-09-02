module.exports = (app, db) => {
    const links = require("./controllers/link.controller.js").controller(db);
    const authenticated = require('../modules/Authenticated.js');

    app.get("/links/", links.findAll);
    app.delete("/links/:linkId", authenticated.authenticationRequired(links.del));
    app.post("/links/", authenticated.authenticationRequired(links.create));
}