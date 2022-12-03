const http = require('http');

function rqListener(req, res) {
    console.log(req.url, req.method, req.headers);
    res.setHeader('Content-Type', 'text/html');
    res.write(
        `<html>
            <body>
                <h1>Hello World</h1>
            </body>
        </html>
        `
    );
    res.end(); //Send back to the client. Don't write anything after it.
};

const server = http.createServer(rqListener);

server.listen(3000);