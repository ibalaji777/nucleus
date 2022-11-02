/*eslint-disable*/
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


const {SerialPort,ReadlineParser} = require('serialport');
const { json } = require('express');
// const Readline = require('@serialport/parser-readline');

const writeDelay = 2000; // reducing this value stops it working
const path = 'COM9';//windows
// const path = '/dev/ttyACM0';//rasobert pi
const port = new SerialPort( {path,
    lock: false,
    baudRate: 9600,
});

port.on('open', () => {
    setTimeout(function () {
        console.log('sending: ping');
        port.write('ping');
    }, writeDelay);
});

const parser = new ReadlineParser({ delimiter: '\r\n' });

port.pipe(parser);

parser.on('data', function (data) {
    console.log('from arduino:', data);
    io.sockets.emit("readData", JSON.parse(JSON.stringify(data)));

});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/clear', () => {
  port.write('clear', function(err) {
    if (err) {
      return console.log('Error on write: ', err.message)
    }
    console.log('message written')
  })
  
});


io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(4444, () => {
  console.log('listening on *:4444');
});