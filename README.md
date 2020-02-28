# GITHUB-LISTENER

_By default running on port: 9000_

## Auto-updating

Every push to this repository emits a webhook containing inforamtion about the push target branch. Upon receiving an incoming web-hook from github listener tries to find a folder with the same name as the branch, pulls the changes and restarts the server.js file

To summarize, on web-hook: `node /home/{branch}/server`

## Server health

Can be accessesed by sending a GET request to server base url either with a tool or just by accessing it with a web browser.

Foreach folder in /home/ tries to determine if that folder is a git repository, its current git status and if there is an active node process associated with this folder.