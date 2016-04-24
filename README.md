# aa-chat-server

[![Build Status](https://travis-ci.org/Fleischers/aa-chat-server.svg?branch=master)](https://travis-ci.org/Fleischers/aa-chat-server)
[![Code Climate](https://codeclimate.com/github/Fleischers/aa-chat-server/badges/gpa.svg)](https://codeclimate.com/github/Fleischers/aa-chat-server)
[![Test Coverage](https://codeclimate.com/github/Fleischers/aa-chat-server/badges/coverage.svg)](https://codeclimate.com/github/Fleischers/aa-chat-server/coverage)
[![Issue Count](https://codeclimate.com/github/Fleischers/aa-chat-server/badges/issue_count.svg)](https://codeclimate.com/github/Fleischers/aa-chat-server)

## Quickstart

`npm install`  
`npm start`

## Development

Used `.editorconfig` for your Code Editor to keep code style.  
`js-beautify` for auto format code

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



### Useful info
http://socket.io/docs/logging-and-debugging/
