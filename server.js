/*server.js*/
var port = 8000;
var serverUrl = "127.0.0.1";

var WebSocket = require('ws')
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
            initializeWS();
        } else {
            res.writeHead(500);
            res.end();
        }
    });
}

var boop_array = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

function initializeWS() {
    
    const wss = new WebSocket.Server({ port: 8088 })
    
    wss.on('connection', ws => {
    
        ws.on('message', message => {
            console.log(`Received message => ${message}`)
            
            var data = JSON.parse(message);
            if (data[0]=='boop')
            {
                var index = data[1]*8 + data[2];
                updateBoop(index);
                broadcastBoops(wss, 'update');
            }
        })
        
        var connection_data = ['connection', boop_array];
        ws.send(JSON.stringify(connection_data));
    });
    
    wss.on('error', message => {
        console.log(`Error occured => ${message}`)
    })
}

function broadcastBoops(wss, event) {
    var boop_info = JSON.stringify([event, boop_array]);
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(boop_info);
        }
    });
}

function updateBoop(index) {
    boop_array[index] = (boop_array[index] + 1) % 3;
}

