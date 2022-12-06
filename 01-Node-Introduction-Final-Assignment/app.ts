const http = require('http');

const routes = require('./routes');

const ENV_PORT:number = 3000;

const server = http.createServer(routes);

server.listen(ENV_PORT, () => {
    console.log(`Listening on port ${ENV_PORT}`)
})