'use strict';

require('should');
var io = require('socket.io-client');
var Chat = require('./../app');
var winston = require('winston');

// configure winston
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  colorize: true,
  level: 'debug',
  prettyPrint: true,
  humanReadableUnhandledException: true
});

describe('Websocket connection', function () {
  const PORT = 3002;

  var user1, user2;
  var chat = new Chat(PORT);

  before('should set port for chat module', function () {
    chat.init();
  });

  describe('User 1', function () {

    before(function () {
      user1 = io('http://localhost:' + PORT);
      user1.on('connect', function () {
        // user1.on('info', function (msg) {
        //   winston.info(msg);
        // });
        user1.on('message', function (msg) {
          winston.info(msg);
        });
      });
    });

    it('should send 2 messages from User1 in a row', function () {
      user1.emit('message', {
        content: 'json'
      });
      user1.emit('message', {
        content: 'Hello guys!',
        nickname: 'The King'
      });
    });

    it('should get history', function (done) {
      user1.emit('history', {});
      user1.on('history', function (msg) {
        winston.info(msg);
        let messagesCount = 2;
        msg.messages.length.should.be.equal(messagesCount);
        done();
      });
    });

    it('should send empty message to get error', function (done) {
      user1.emit('message');
      user1.on('info', function (msg) {
        msg.error.should.be.ok();
        done();
      });
    });

    it('should recreate user1 after fail', function () {
      user1 =  io('http://localhost:' + PORT);
    });

    after('should disconnect', function (done) {
      let WAIT_TIME = 100;

      user1.disconnect();
      setTimeout(function () {
        done();
      }, WAIT_TIME);
    });
  });

  describe('User 2', function () {

    before(function () {
      user2 = io('http://localhost:' + PORT);
      user2.on('connect', function () {
        // user2.on('info', function (msg) {
        //   winston.info(msg);
        // });
        user2.on('message', function (msg) {
          winston.info(msg);
        });
      });
    });

    it('should connect user1 again', function () {
      user1.connect();
    });

    it('should send string to message, instead of object', function (done) {
      user1.send('message', 'Hello, guys!');
      user1.on('info', function (msg) {
        let expected = 'message should be object';
        msg.message.should.startWith(expected);
        done();
      });
    });
  });

  it('should additionally launch chat on default port just to check it works', function () {
    let chat = new Chat();
    winston.debug(chat);
  });

});
