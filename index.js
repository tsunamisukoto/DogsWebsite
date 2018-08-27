// Setup basic express server
var useGoogle = (process.argv[2] == "useGoogle");
var express = require('express');
const dbConfig = require('./config/database.config.js');
const generalSettings = require('./config/general.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
var app = express();

const bodyParser = require('body-parser');
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.get("/styleSheet", (req, res) => {
    res.sendFile(__dirname + '/public/Styles/' + generalSettings.cssFile);

});
app.use(express.static('public'));
require('./routes/dogs.routes.js')(app);
require('./routes/contactinfo.routes.js')(app);
require('./routes/announcements.routes.js')(app);
require('./routes/links.routes.js')(app);
require('./routes/pagecontent.routes.js')(app);
require('./routes/auth.routes.js')(app);

app.get("/galleryImages", (req, res) => {
    const testFolder = 'public/Images/Gallery/';
    const fs = require('fs');

    fs.readdir(testFolder, (err, files) => {
        res.send(files);
    })
});
app.get("/puppyImages", (req, res) => {
    const testFolder = 'public/Images/Puppies/';
    const fs = require('fs');

    fs.readdir(testFolder, (err, files) => {
        res.send(files);
    })
});
app.get("/Images/:nickname", (req, res) => {

    const testFolder = 'public/Images/' + req.params.nickname;
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
var dbo = null;
function sha256(data) {
  return crypto.createHash("sha256").update(data).digest("base64");
}
server.listen(port,"0.0.0.0", function () {
  console.log('Server listening at port %d', port);
});


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
