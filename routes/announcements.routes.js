module.exports = (app) => {
    const announcements = require("./controllers/announcements.controller.js");
    const authenticated = require('../modules/Authenticated.js');

    app.get("/announcements/", announcements.findOne);
    app.post("/announcements/",authenticated.authenticationRequired(announcements.create));
    app.delete("/announcements/:announcementId", authenticated.authenticationRequired(announcements.delete));

}