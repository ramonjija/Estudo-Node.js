const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.write('<div><h1><span style="color:orange">Hello</span> <span style="color:blue">World</span></h1></div>');
        res.end();
    }
    if(req.url === '/api/courses' ) {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});

server.listen(8083);
console.log('Listening on port 8083');

