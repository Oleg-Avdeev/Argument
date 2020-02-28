const { execSync } = require('child_process');
const { readdirSync, statSync, readFileSync } = require('fs');
const { join } = require('path');

exports.showServerStatus = function (res) {
    const getDirs = p => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory())

    const path = '/home';
    const dirs = getDirs(path);
    var response = "";

    for (var i = 0; i < dirs.length; i++) {
        const server = dirs[i];
        console.log(`Checking server ${server}`);
        const command = `sh /home/github-listener/get-server-state.sh ${path} ${server}`;
        response += "<div>"
        response += `\n --- ${dirs[i]} --- \n`;
        try {
            const result = execSync(command, { cwd: path });
            response += result;
            response += getButtonsHTML(server);
        }
        catch (exception) {
            response += exception;
        }
        response += "</div>"
    }

    var style = readFileSync('./modules/status-style.css').toString();

    var document = `
    <html>
    <head>
        <title>[Mercury]</title>
        <style>
            ${style}
        </style>
    </head>
    <body>${response}</body>
    <script>
        function runServer(server)  {
            fetch("http://172.105.102.5:9000?func=run&server="+server);
        }
    </script>
    </html>`
    res.end(document);
}

exports.runServer = function (server) {
    const path = '/home'
    const command = `sh /home/github-listener/start-server.sh ${path} ${server}`;

    try {
        const result = execSync(command);
    }
    catch (exception) {
        console.log(exception);
    }
}

function getButtonsHTML(server) {
    return `<button onclick="runServer(${server})">Run</button>`;
}