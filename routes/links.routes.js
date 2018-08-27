module.exports = (app) => {
    const links = require("./controllers/link.controller.js");
    const authenticated = require('../modules/Authenticated.js');

    app.get("/links/", links.findOne);
    app.delete("/links/:linkId", authenticated.authenticationRequired(links.delete));
    app.post("/links/", authenticated.authenticationRequired(links.create));
}