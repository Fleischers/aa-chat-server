'use strict';

var PORT = 3001;
var io = require('socket.io')(PORT);

io.on('connection', function(socket){
  console.log('connection');
  socket.on('message', function(msg){
    console.log('message: ' + msg);
  });
});

io.on('listen', function () {
    console.log('Server is listening on port %s', PORT);
});

io.on('error', function (error) {
    // speaks while holding a bow in his hands:
    console.log('You have failed this server!');
    throw error;
});
