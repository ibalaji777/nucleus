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
// const path = "COM4"; //windows
let port;
let path;
let portList;
// const path = '/dev/ttyACM0';//rasobert pi
SerialPort.list().then((ports) => {
 path = ports[0].path;
 portList = ports;
 port = new SerialPort({ path, lock: false, baudRate: 9600 });

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

 //    console.log("Available serial ports:", ports);
});
// const port = new SerialPort({ path, lock: false, baudRate: 9600 });

app.get("/", (req, res) => {
 const data = { message: "Communication Established" };
 res.json(data);
 //  res.sendFile(__dirname + "/index.html");
});

app.get("/port", (req, res) => {
 const data = { message: "Connected Port", port: path };
 res.json(data);
 //  res.sendFile(__dirname + "/index.html");
});

app.get("/port_list", (req, res) => {
 const data = { message: "Device Ports", ports: portList };
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

server.listen(4444, () => {
 console.log("listening on *:4444");
});
