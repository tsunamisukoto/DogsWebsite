module.exports = (app, db) => {
    const dogs = require("./controllers/dog.controller.js").controller(db);
    const authenticated = require('../modules/Authenticated.js');
    
    app.get("/dogs/:category?", dogs.findAll);
    app.post("/dogs",authenticated.authenticationRequired( dogs.create));

    app.get("/dogs/:dogId", dogs.findOne);
    app.put("/dogs/:dogId", authenticated.authenticationRequired(dogs.update));
    app.delete("/dogs/:dogId", authenticated.authenticationRequired(dogs.del));

    var multer = require('multer');
    app.post('/UploadImage/:path', authenticated.authenticationRequired(function (req, res, next) {
        var uploader = multer({ dest: 'public/Images/' + req.params.path + '/' }).single('Image');
        uploader(req, res, function (err) {
            res.redirect(req.get('referer'));
        });
    }));
    app.post('/UploadImage/DogImages/:rowid', authenticated.authenticationRequired(function (req, res, next) {
        var uploader = multer({ dest: 'public/Images/DogImages/' + req.params.rowid + '/' }).single('Image');
        uploader(req, res, function (err) {
            res.redirect(req.get('referer'));
        });
    }));

}