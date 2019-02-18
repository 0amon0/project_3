const http = require('http');
const app = require('./app');

const port = process.env.PORT || 1300;

const server = http.createServer(app);





//postmanze maq sul datestili marto :

server.listen(port, ()=>{
    console.log('1300 port')
});