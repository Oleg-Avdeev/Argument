var port = 8000;
var serverUrl = "127.0.0.1";

var desk = require("./modules/deskmanager");
var http = require("http");
var path = require("path");
var fs = require("fs");

var checkMimeType = true;

console.log("Starting web server at " + serverUrl + ":" + port);

http.createServer(function (req, res) {

    var now = new Date();

    var filename = req.url || "pages/ws-desk.html";
    var ext = path.extname(filename);
    var localPath = __dirname;
    var validExtensions = {
        ".html": "text/html",
        ".js": "application/javascript",
        ".css": "text/css",
        ".txt": "text/plain",
        ".jpg": "image/jpeg",
        ".gif": "image/gif",
        ".png": "image/png",
        ".woff": "application/font-woff",
        ".woff2": "application/font-woff2"
    };

    var validMimeType = true;
    var mimeType = validExtensions[ext];
    if (checkMimeType) {
        validMimeType = validExtensions[ext] != undefined;
    }

    if (validMimeType) {
        localPath += filename;
        fs.exists(localPath, function (exists) {
            if (exists) {
                console.log("Serving file: " + localPath);
                getFile(localPath, res, mimeType);
                desk.runDesk(0, 0);
            } else {
                console.log("File not found: " + localPath);
                res.writeHead(404);
                res.end();
            }
        });

    } else {
        console.log("Invalid file extension detected: " + ext + " (" + filename + ")")
    }
}).listen(port, serverUrl);


function getFile(localPath, res, mimeType) {
    fs.readFile(localPath, function (err, contents) {
        if (!err) {
            res.setHeader("Content-Length", contents.length);
            if (mimeType != undefined) {
                res.setHeader("Content-Type", mimeType);
            }
            res.statusCode = 200;
            res.end(contents);
        } else {
            res.writeHead(500);
            res.end();
        }
    });
}
