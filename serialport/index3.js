/*eslint-disable*/
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const { SerialPort, ReadlineParser } = require("serialport");
const { json } = require("express");
// const Readline = require('@serialport/parser-readline');

const writeDelay = 2000; // reducing this value stops it working
const path = "COM4"; //windows
// const path = '/dev/ttyACM0';//rasobert pi
const port = new SerialPort({ path, lock: false, baudRate: 9600 });
SerialPort.list().then((ports) => {
 console.log("Available serial ports:", ports);
});
port.on("open", () => {
 setTimeout(function () {
  console.log("sending: ping");
  port.write("ping");
 }, writeDelay);
});

const parser = new ReadlineParser({ delimiter: "\r\n" });

port.pipe(parser);

parser.on("data", function (data) {
 console.log("from arduino:", data);
 io.sockets.emit("readData", data);

 //working
});

app.get("/", (req, res) => {
 const data = { message: "Communication Established" };
 res.json(data);
 //  res.sendFile(__dirname + "/index.html");
});
app.get("/clear", () => {
 port.write("clear", function (err) {
  if (err) {
   return console.log("Error on write: ", err.message);
  }
  console.log("message written");
 });
});

app.get("/alertOn", () => {
 port.write("alertOn", function (err) {
  if (err) {
   return console.log("Error on write: ", err.message);
  }
  console.log("message written");
 });
});

app.get("/alertOff", () => {
 port.write("alertOff", function (err) {
  if (err) {
   return console.log("Error on write: ", err.message);
  }
  console.log("message written");
 });
});

io.on("connection", (socket) => {
 console.log("a user connected");
});

server.listen(9999, () => {
 console.log("listening on *:4444");
});
