'use strict';

var DEFAULT_PORT = 3001;
var SocketServer = require('socket.io');
var winston = require('winston');

var io;

function Chat(options) {
  var port = DEFAULT_PORT;

  if (options) {
    port = options.port || DEFAULT_PORT;
  }

  io = new SocketServer(port);
}

Chat.prototype.init = function (callback) {
  io.on('connection', function (socket) {
    winston.debug('user connection');
    socket.on('message', function (msg) {
      winston.debug('message: ', msg);
      io.emit('message', msg);
    });
    socket.on('disconnect', function () {
      winston.debug('user disconnected');
    });
  });

  io.on('error', function (error) {
    // speaks while holding a bow in his hands:
    winston.error('You have failed this server!', error);
  });

  if (callback) {
    return callback();
  }
};

module.exports = Chat;
