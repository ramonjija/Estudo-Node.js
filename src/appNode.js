var http = require("http");
const port = 8081;

http.createServer(requestListener).listen(port);

function requestListener(req, res) {
    res.writeHead(200, {'Content-type': 'text/plain'});
    console.log("Request received, responding now ...");
    res.end("Hello Node");
}