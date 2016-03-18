// jshint mocha: true

'use strict';

var io = require('socket.io-client');

// TODO change hardcoded host
var socket = io('http://localhost:3001');

it('should send message', function(done) {
  socket.on('connect', function() {
    socket.send('message');
    done();
  });
});
