module.exports = (app, db) => {
    const dogs = require("./controllers/dog.controller.js").controller(db);
    const authenticated = require('../modules/Authenticated.js');
    
    app.get("/dogs/:category?", dogs.findAll);
    app.post("/dogs",authenticated.authenticationRequired( dogs.create));

    app.get("/dogs/:dogId", dogs.findOne);
    app.put("/dogs/:dogId", authenticated.authenticationRequired(dogs.update));
    app.delete("/dogs/:dogId", authenticated.authenticationRequired(dogs.del));
}