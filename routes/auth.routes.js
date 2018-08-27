
const crypto = require('crypto');

const sha256 = (data) => {
    return crypto.createHash("sha256").update(data).digest("base64");
}

const authenticated = require('../modules/Authenticated.js');

const config = require('../config/general.config.js');
module.exports = (app) => {

    const parseCookies = (request) => {
        var list = {},
            rc = request.headers.cookie;

        rc && rc.split(';').forEach(function (cookie) {
            var parts = cookie.split('=');
            list[parts.shift().trim()] = decodeURI(parts.join('='));
        });

        return list;
    }
    app.post("/auth/", (req, res) => {
        var hashedPassword = sha256(req.body.val);
        // Validate request

        console.log("Attempted to log in with: (Hashed)" + hashedPassword);
        if (hashedPassword == config.hashedPassword) {
            res.writeHead(200, {
                'Set-Cookie': 'authenticatedRequest=' + hashedPassword,
                'Content-Type': 'text/plain'
            });
            res.end("true");
        }
        else
            res.send("false");
    });
    app.get("/auth/", (req, res) => {
        var isAuthenticated = authenticated.checkIsAuthenticatedRequest(req, res);
        res.send(isAuthenticated);
    });
}