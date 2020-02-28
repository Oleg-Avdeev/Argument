const http = require('http');
const url = require('url');

const { parse } = require('querystring');
const panel = require('./modules/status-panel');
const github = require('./modules/github-handler');


const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            github.parseWebhook(result, res);
        });
    }
    else {
        var query = url.parse(req.url, true).query;

        if (isEmpty(query)) panel.showServerStatus(res);
        else if (query["func"] === "run")
            panel.runServer(query["server"]);
    } 
});
server.listen(9000);

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if (request.headers['content-type'] === FORM_URLENCODED) {
        request.on('data', chunk => {
            try {
                var p = parse(chunk.toString());
                var json = JSON.parse(p["payload"]);
                callback(json);
            }
            catch
            {
                callback(null);
            }
        });
    }
    else {
        callback(null);
    }
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  