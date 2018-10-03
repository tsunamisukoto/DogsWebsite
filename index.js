// Setup basic express server
var useGoogle = (process.argv[2] == "useGoogle");
var express = require('express');
const dbConfig = require('./config/database.config.js');
const generalSettings = require('./config/general.config.js');
var app = express();

const bodyParser = require('body-parser');
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
const rateLimit = require("express-rate-limit");

app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000 // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);
// parse requests of content-type - application/json
app.use(bodyParser.json())
app.get("/styleSheet", (req, res) => {
    res.sendFile(__dirname + '/public/Styles/' + generalSettings.cssFile);

});

const database = require("./modules/Database");
database.init();
app.use(express.static('public'));
require('./routes/dogs.routes.js')(app, database);
require('./routes/contactinfo.routes.js')(app, database);
require('./routes/announcements.routes.js')(app, database);
require('./routes/links.routes.js')(app, database);
require('./routes/pagecontent.routes.js')(app, database);
require('./routes/auth.routes.js')(app);

app.get("/galleryImages", (req, res) => {
    const testFolder = 'public/Images/Gallery/';
    const fs = require('fs');

    fs.readdir(testFolder, (err, files) => {
        res.send(files);
    })
});
app.get("/ImageCollection/:folder", (req, res) => {
    const testFolder = 'public/Images/' + req.params.folder + '/';
    const fs = require('fs');

    fs.readdir(testFolder, (err, files) => {
        res.send(files);
    })
});
app.get("/Images/DogImages/:rowid", (req, res) => {

    const testFolder = 'public/Images/DogImages/' + req.params.rowid;
    const fs = require('fs');

    fs.readdir(testFolder, (err, files) => {
        res.send(files);
    })
});
app.get("/dogImages", (req, res) => {
    const testFolder = 'public/Images/';
    const fs = require('fs');

    fs.readdir(testFolder, (err, files) => {
        res.send(files);
    })
});
const https = require('https');
var server = require('http').createServer(app);
var port = process.env.PORT || 5051;
var request = require('request');
const crypto = require('crypto');

var dogQueries= {
  isStudDog:{
    isStudDog: true
  }

}
function sha256(data) {
  return crypto.createHash("sha256").update(data).digest("base64");
}
server.listen(port,"0.0.0.0", function () {
  console.log('Server listening at port %d', port);
});


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
