module.exports = (app, db) => {
    const announcements = require("./controllers/announcements.controller.js").controller(db);
    const authenticated = require('../modules/Authenticated.js');

    app.get("/announcements/", announcements.findAll);
    app.post("/announcements/",authenticated.authenticationRequired(announcements.create));
    app.delete("/announcements/:announcementId", authenticated.authenticationRequired(announcements.del));

}