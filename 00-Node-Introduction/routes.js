const fs = require('fs');

function requestHandler(req, res) {
    const url = req.url;
    const method = req.method;
    console.log(req.url, req.method, req.headers);
    res.setHeader('Content-Type', 'text/html');
    if (url === '/') {
        res.write(
            `<html>
                <body>
                    <h1>Hello World</h1>
                    <form action="/test" method="POST">
                        <input type="text" name="test">
                            <button type="submit"> Click me to post </button>
                        </input>
                    </form>
                </body>
            </html>
            `
        );
        return res.end();
    }

    if (url === '/test' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('test.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    return res.end(); //Send back to the client. Don't write anything after it.
};

module.exports = requestHandler;

/**
 * Can also be like this
 *  module.exports = {
 *      handler: requestHandler,
 *      someText: 'Meow'
 *  }
 * 
 * OR
 * 
 *  exports.handler = requestHandler,
 *  exports.someText = 'Meow',
 */