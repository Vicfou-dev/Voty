var config = require('./config/server.json');

config.app = app = require('http').createServer()
config.io = require('socket.io')(app);

const Server = require('./src/server.js')(config);
Server.start();