const http = require('http');
const fs = require('fs');

function rqListener(req, res) {
    const url = req.url;
    const method = req.method;
    console.log(req.url, req.method, req.headers);
    res.setHeader('Content-Type', 'text/html');
    if (url === '/') {
        res.write(
            `<html>
                <body>
                    <h1>Hello World</h1>
                </body>
            </html>
            `
        );
        return res.end();
    }
    if (url === '/test' && method === 'GET') {
        fs.writeFileSync('test.txt', 'Dummy Test');
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
    return res.end(); //Send back to the client. Don't write anything after it.
};

const server = http.createServer(rqListener);

server.listen(3000);