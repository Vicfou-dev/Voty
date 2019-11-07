const io = require('socket.io-client')
const config = require('../config/server.json');
const io_server = require('../src/server.js');

const client = {
    connectTo : "http://localhost:" + config.port,
    config : {
        'reconnection delay' : 0, 
        'reopen delay' : 0,
        'force new connection' : true,
        transports: ['websocket']
    }
}

describe('basic socket.io example', function() {

    var socket;
  
    beforeEach(function(done) {
      
      socket = io.connect(client.connectTo,client.config);
  
      socket.on('connect', () => {
          console.log('connect..!');
      });
  
      socket.on('disconnect', () => {
        console.log('disconnect...');
      });

      done();

    });
  
    afterEach((done) => {

      if(socket.connected) { socket.disconnect(); }
      io_server.close();
      done();

    });
  
    it('should communicate', (done) => {
      // once connected, emit Hello World
      io_server.emit('echo', 'Hello World');
  
      socket.once('echo', (message) => {
        // Check that the message matches
        expect(message).to.equal('Hello World');
        done();
      });
  
      io_server.on('connection', (socket) => {
        expect(socket).to.not.be.null;
      });

    });

});  