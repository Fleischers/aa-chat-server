'use strict';

require('should');
var io = require('socket.io-client');
var Chat = require('./../app');

describe('Websocket connection', function () {
  var PORT = 3002;
  // TODO change hardcoded host
  var socket = io('http://localhost:' + PORT);
  var chat = new Chat({port: PORT});

  before('should set port for chat module', function () {
    chat.init();
  });

  it('should send message', function(done) {
    socket.on('connect', function() {
      socket.send('message', {content: 'json'});
      // FIXME not testing really anything
      done();
    });
  });

  it('should disconnect', function (done) {
    var WAIT_TIME = 100;

    socket.disconnect();
    // FIXME does not testing really anything
    setTimeout(function () {
      done();
    }, WAIT_TIME);

  });

});
