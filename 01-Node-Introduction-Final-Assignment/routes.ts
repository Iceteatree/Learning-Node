const fs = require('fs');
const ejs = require('ejs');
const users = require('./constants');

const routeHandler = (req: any, res: any) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        const greetingHtml = fs.readFileSync('01-Node-Introduction-Final-Assignment/src/index.html');
        res.writeHead(200, {'Content-Type': 'text/html' });
        return res.end(greetingHtml);
    }
    if (url === '/users') {
        /**
         * Tried to do this with only node and no express... Turns out really difficult.
         */
        // const ejsFile = ejs.render('01-Node-Introduction-Final-Assignment/src/users.ejs')
        // res.writeHead(200, {'Content-Type':'application/json'});
        // res.writeHead(200, {'Content-Type': 'text/html' });
        // res.writeHead(200, {'Content-Type':'text/plain'});
        // return res.end(ejsFile);
        const ejsHtml = fs.readFileSync('01-Node-Introduction-Final-Assignment/src/users.ejs');
        res.writeHead(200, {'Content-Type': 'text/html' });
        return res.end(ejsHtml);
    }
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk:never) => {
            body.push(chunk);
        });
        req.on('end', () => {
            res.statusCode = 302;
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            console.log('Username', username);
            return res.end();
        })
        return res.end();
    }
    res.writeHead(404);
    return res.end();
};

module.exports = routeHandler;