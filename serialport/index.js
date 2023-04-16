/*eslint-disable*/
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var Storage = require("node-storage");

var store = new Storage("./config.json");

const { SerialPort, ReadlineParser } = require("serialport");
const { json } = require("express");
// const Readline = require('@serialport/parser-readline');

const writeDelay = 2000; // reducing this value stops it working
// const path = "COM4"; //windows
let port;
let path = "";
let portList;
let baudRate = 9600;
let isDeviceFound = "";
// const path = '/dev/ttyACM0';//rasobert pi
SerialPort.list().then((ports) => {
 //  ------------------------
 const arduinoRegex = /Arduino Uno/;
 const arduinoPort = ports.find((port) => arduinoRegex.test(port.friendlyName));
 if (arduinoPort) {
  const arduinoPath = arduinoPort.path;
  path = arduinoPath;
  if (store.get("path") == "") {
   store.put("path", arduinoPath);
   isDeviceFound = true;
  }
  console.log(`Arduino Uno found at ${arduinoPath}`);
 } else {
  isDeviceFound = false;
  console.log("Arduino Uno not found.");
 }
 // ----------------------------
 portList = ports;
 port = new SerialPort({ path, lock: false, baudRate });

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
app.get("/stored-path", (req, res) => {
 const data = { message: "Communication Established", port: store.get("path") };
 res.json(data);
});
app.get("/", (req, res) => {
 const data = { message: "Communication Established" };
 res.json(data);
});
app.get("/status", (req, res) => {
 const data = {
  message: "Communication Established",
  port: store.get("path"),
  baudRate,
 };
 res.json(data);
});
app.get("/device-check", (req, res) => {
 const data = {
  message: isDeviceFound ? "Device Found Successfully" : "Not Found",
  suggesion: isDeviceFound
   ? "Device Connected"
   : "Please Select Your Port manually to select(url?port=com20)",
 };
 res.json(data);
});
app.get("/device-detect", (req, res) => {
 const arduinoRegex = /Arduino Uno/;
 const arduinoPort = portList.find((port) =>
  arduinoRegex.test(port.friendlyName)
 );
 if (arduinoPort) {
  const arduinoPath = arduinoPort.path;
  path = arduinoPath;
  store.put("path", arduinoPath);
  isDeviceFound = true;
 } else {
  isDeviceFound = false;
 }

 const data = {
  message: isDeviceFound ? "Device Found Successfully" : "Not Found",
  suggesion: isDeviceFound
   ? "Device Connected"
   : "Please Select Your Port manually to select(url?port=com20)",
 };
 res.json(data);
});
app.get("/set-port", (req, res) => {
 const port_ = req.query.port;
 store.put("path", port_);

 const data = {
  message: "Connected Port is set",
  port: store.get("path"),
  suggesion: "Please  Reopen Your  application",
 };
 res.json(data);
});

app.get("/port", (req, res) => {
 const data = { message: "Connected Port", port: store.get("path") };
 res.json(data);
});

app.get("/port_list", (req, res) => {
 const data = { message: "Device Ports", ports: portList };
 res.json(data);
});

app.get("/clear", (req, res) => {
 port.write("clear", function (err) {
  if (err) {
   return console.log("Error on write: ", err.message);
  }
 });

 const data = { message: "Embeded Cleared" };
 res.json(data);
});

app.get("/alertOn", (req, res) => {
 port.write("alertOn", function (err) {
  if (err) {
   return console.log("Error on write: ", err.message);
  }
 });
 const data = { message: "Alert ON" };
 res.json(data);
});

app.get("/alertOff", (req, res) => {
 port.write("alertOff", function (err) {
  if (err) {
   return console.log("Error on write: ", err.message);
  }
 });
 const data = { message: "Alert Off" };
 res.json(data);
});

io.on("connection", (socket) => {
 console.log("a user connected");
});

server.listen(4444, () => {
 console.log("listening on *:4444");
});
