'use strict';

var PORT = 3001;
var io = require('socket.io')(PORT);
var winston = require('winston');

io.on('connection', function (socket) {
  winston.info('user connection');
  socket.on('message', function (msg) {
    winston.info('message: ', msg);
    io.emit('message', msg);
  });
  socket.on('disconnect', function(){
    winston.info('user disconnected');
  });
});

io.on('listen', function () {
  winston.info('Server is listening on port %s', PORT);
});

io.on('error', function (error) {
  // speaks while holding a bow in his hands:
  winston.error('You have failed this server!');
  throw error;
});
