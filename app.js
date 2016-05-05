'use strict';

var DEFAULT_PORT = 3001;
var SocketServer = require('socket.io');
var winston = require('winston');
var shortid = require('shortid');
var _ = require('lodash');

/**
 * Set chat events types in strings
 * @type {Object}
 */
var CHAT = {
  info: 'info',
  message: 'message'
};

/**
 * Variable to contain main socket.io server object
 * @global
 */
var io;

/**
 * All messages in primitive Array
 * @type {Array}
 */
var history = [];

/**
 * Creates new Chat instance. Can work
 * @constructor
 * @param {Object|Number} options - can be express server or just port number
 */
function Chat(options) {
  if (options) {
    io = SocketServer(options);
  } else {
    io = SocketServer(DEFAULT_PORT);
  }
}

/**
 * Should be launched to set listeners
 * @return {null} Nothing to return
 */
Chat.prototype.init = function () {

  io.on('connection', function (socket) {
    winston.debug('user %s connection', socket.id);

    /**
     * Listen for 'message' events.
     * Set date for message.
     * Set id for message.
     * Save message to history.
     * Broadcast message event to all other connected sockets
     */
    socket.on(CHAT.message, function onMessage(msg) {
      let responseMessage = _.cloneDeep(msg);
      if (_.isObject(responseMessage) || !_.isString(responseMessage)) {
        responseMessage.date = new Date();
        let id = shortid.generate();
        responseMessage._id = id;
        history.push(responseMessage);
        winston.debug('message:', responseMessage);
        socket.broadcast.emit(CHAT.message, responseMessage);
        socket.emit('echo', responseMessage);
      } else {
        socket.emit(CHAT.info, {
          status: 2,
          message: 'message should be object'
        });
      }

    });

    /**
     * Get all history from simple array and send to socket asked for it
     */
    socket.on('history', function (msg) {
      winston.debug('history: %s:', socket.id, msg);
      socket.emit('history', {
        messages: history
      });
    });

    /**
     * Emits 'info' event upon socket disconnected
     */
    socket.on('disconnect', function onDisconnect() {
      let message = 'user disconnected';

      // TODO make doc and consistent feel for status and code messages
      let status = {
        status: 0,
        code: 0,
        message: message
      };
      winston.debug(status);

      io.emit(CHAT.info, status);
    });

    /**
     * Will response to client with error message if some exception on socket occurred
     */
    socket.on('error', function (error) {
      // speaks while holding a bow in his hands:
      let failMessage = 'You have failed this server!';
      winston.error(failMessage, error);
      socket.emit(CHAT.info, {
        status: 1,
        message: failMessage,
        error: true
      });
    });
  });
};

module.exports = Chat;
