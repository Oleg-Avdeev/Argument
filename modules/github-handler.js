const { exec } = require('child_process');

exports.parseWebhook = function (json, res) {
    if (json !== null) {

        console.log("Incoming webhook detected. Parsing");
        const branch = json["ref"].split("/").pop();
        const command = 'sh /home/github-listener/refresh-repo.sh ' + branch;

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
}