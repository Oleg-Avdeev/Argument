const http = require('http');
const { parse } = require('querystring');
const { exec } = require('child_process');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            
            console.log("Incoming webhook detected. Parsing");
            const branch = result["ref"].split("/").pop();
            const command = 'sh';
            
            // const child = exec(command, ['sh /home/github-listener/refresh-repo.sh github-listener', branch, 'branch']);
            const child = exec('sh /home/github-listener/refresh-repo.sh github-listener');

            child.on('exit', code => {
                res.end(`Exit code is: ${code}`);
            });

            child.stdout.on('data', (data) => {
                console.log(data);
            });

            child.stderr.on('data', (data) => {
                console.log(data);
            });
            
        });
    } 
    else {
        res.end(`Argument server is doing ok... How are you?`);
    }
});
server.listen(9000);

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        request.on('data', chunk => {
		var p = parse(chunk.toString());
		var json = JSON.parse(p["payload"]);
		callback(json);
        });
    }
    else {
        callback(null);
    }
}