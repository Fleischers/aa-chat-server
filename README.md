# aa-chat-server

[![Build Status](https://travis-ci.org/Fleischers/aa-chat-server.svg?branch=master)](https://travis-ci.org/Fleischers/aa-chat-server)
[![Code Climate](https://codeclimate.com/github/Fleischers/aa-chat-server/badges/gpa.svg)](https://codeclimate.com/github/Fleischers/aa-chat-server)
[![Test Coverage](https://codeclimate.com/github/Fleischers/aa-chat-server/badges/coverage.svg)](https://codeclimate.com/github/Fleischers/aa-chat-server/coverage)
[![Issue Count](https://codeclimate.com/github/Fleischers/aa-chat-server/badges/issue_count.svg)](https://codeclimate.com/github/Fleischers/aa-chat-server)
[![bitHound Dependencies](https://www.bithound.io/github/Fleischers/aa-chat-server/badges/dependencies.svg)](https://www.bithound.io/github/Fleischers/aa-chat-server/master/dependencies/npm)
[![Dependency Status](https://www.versioneye.com/user/projects/57399a3da0ca350034be7d72/badge.svg?style=flat)](https://www.versioneye.com/user/projects/57399a3da0ca350034be7d72)

This is a module to create simple Websocket chat server

## Quickstart

`npm install`  
`npm start`

## Standalone
Create `.env` file to define environment variables
`AA_CHAT_PORT` - Websocket port to be listened for incoming connections

## Development

Used `.editorconfig` for your Code Editor to keep code style.  
`js-beautify` for auto format code


### Tests
`npm test` - to run tests  
Look into `open coverage/lcov-report/index.html` to check coverage report

### API

#### message
<- to server

``` js
{
  "username": "Vasiliy",
  "content": "Hello. I am here"
}
```

-> from server

``` js
{
  "_id": "2487539857",
  "username": "Taras",
  "content": "Me too.",
  "date": "MON20121023"
}
```
#### info
-> from server

status 0 is ok, else is error

Disconnected user:
``` js
{
  "status": 0,
  "code": 0
  "message": "user disconnected"
}
```
#### history
emit history to get previous messages from chat

#### echo
Message you emit to `message` will return back just after broadcasting to everyone else

### Useful info
http://socket.io/docs/logging-and-debugging/
