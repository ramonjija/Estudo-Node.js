let express = require('express');
let app = express();

const port = (process.env.PORT || 8082);

app.use(requestListener).listen(port);
console.log('Listening on port '+ port)

function requestListener(req, res) {
    console.log("Request received, responding now ...");
    res.send("Hello Node with Express");
}