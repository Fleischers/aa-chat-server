'use strict';

var PORT = 3001;
var io = require('socket.io')(PORT);
var winston = require('winston');

io.on('connection', function (socket) {
  winston.info('connection');
  socket.on('message', function (msg) {
    winston.info('message: ' + msg);
  });
});

io.on('listen', function () {
  winston.info('Server is listening on port %s', PORT);
});

io.on('error', function (error) {
  // speaks while holding a bow in his hands:
  winston.info('You have failed this server!');
  throw error;
});
