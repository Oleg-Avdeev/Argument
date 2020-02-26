const http = require('http');

const { parse } = require('querystring');
const { exec, execSync } = require('child_process');
const { readdirSync, statSync } = require('fs');
const { join } = require('path');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        collectRequestData(req, result => {

            if (result !== null) {

                console.log("Incoming webhook detected. Parsing");
                const branch = result["ref"].split("/").pop();
                const command = 'sh refresh-repo.sh ' + branch;

                const child = exec(command);

                child.on('exit', code => {
                    res.end(`Exit code is: ${code}`);
                });

                child.stdout.on('data', (data) => {
                    console.log(data);
                });

                child.stderr.on('data', (data) => {
                    console.log(data);
                });
            }
            else {
                console.log("Parsing failed! Something is wrong with either github, json, or more probably, oleg\'s code");
                res.end("Not ok. Parsing failed!");
            }

        });
    }
    else {
        const getDirs = p => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory())
        
        const path = '/Users';
        const dirs = getDirs(path);
        var response = "";
        
        for (var i = 0; i < dirs.length; i++)
        {
            const server = dirs[i];
            console.log(`Checking server ${server}`);
            const command = `sh get-server-state.sh ${path} ${server}`;
            const result = execSync(command);
            response += `\n --- ${dirs[i]} --- \n` + result;
        }

        res.end(response);
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