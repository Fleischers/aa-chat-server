'use strict';

var DEFAULT_PORT = 3001;
var SocketServer = require('socket.io');
var winston = require('winston');
var shortid = require('shortid');
var _ = require('lodash');

var CHAT = {
  info: 'info',
  message: 'message'
};

var io;
var history = new Map();


function Chat(options) {
  var port = DEFAULT_PORT;

  if (options) {
    port = options.port || DEFAULT_PORT;
  }

  io = new SocketServer(port);
}


function onDisconnect() {
  let message = 'user disconnected';

  let status = {
    status: 0,
    code: 0,
    message: message
  };
  winston.debug(status);

  io.emit(CHAT.info, status);
}

Chat.prototype.init = function (callback) {

  io.on('connection', function (socket) {
    winston.debug('user connection');

    socket.on(CHAT.message, function onMessage(msg) {
      let responseMessage = _.cloneDeep(msg);
      if (_.isObject(responseMessage) || !_.isString(responseMessage)) {
        responseMessage.date = new Date();
        let id = shortid.generate();
        responseMessage._id = id;
        history.set(id, responseMessage);
        winston.debug('message:', responseMessage);
        socket.broadcast.emit(CHAT.message, responseMessage);
      } else {
        socket.emit(CHAT.info, { status: 2, message: 'message should be object'});
      }

    });

    socket.on('disconnect', onDisconnect);

    socket.on('error', function (error) {
      // speaks while holding a bow in his hands:
      let failMessage = 'You have failed this server!';
      winston.error(failMessage, error);
      socket.emit(CHAT.info, { status: 1, message: failMessage, error: error});
    });
  });

  if (callback) {
    return callback();
  }
};

module.exports = Chat;
