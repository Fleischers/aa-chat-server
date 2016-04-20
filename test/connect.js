// jshint mocha: true

'use strict';

require('should');
var io = require('socket.io-client');

// TODO change hardcoded host
var socket = io('http://localhost:3001');

require('./../app');

it('should send message', function(done) {
  socket.on('connect', function() {
    socket.send('message', {content: 'json'});
    // FIXME not testing really anything
    done();
  });
});

it('should disconnect', function (done) {
  socket.disconnect();
  // FIXME does not testing really anything
  setTimeout(function () {
    done();
  }, 100);

});
