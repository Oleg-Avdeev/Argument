const http = require('http');

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
        panel.showServerStatus(res);
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
