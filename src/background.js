/*eslint-disable*/
"use strict";

import { app, protocol, BrowserWindow } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";
const schedule = require("node-schedule");
const path = require("path");
let serialport = require("/serialport/index.js");
const child_process = require("child_process");
app.allowRendererProcessReuse = false;
//

// import serialport from '../serialport/index'
// const {SerialPort,ReadlineParser} = require('serialport');
// const Readline = require('@serialport/parser-readline');

// const writeDelay = 2000; // reducing this value stops it working
// const path = 'COM9';
// const port = new SerialPort( {path,
//     lock: false,
//     baudRate: 9600,
// });

// port.on('open', () => {
//     setTimeout(function () {
//         console.log('sending: ping');
//         port.write('ping');
//     }, writeDelay);
// });

// const parser = new ReadlineParser({ delimiter: '\r\n' });

// port.pipe(parser);

// parser.on('data', function (data) {
//     console.log('from arduino:', data);
// });

// const server = child_process.spawn("node", ["--inspect", "index.js"], {
//  cwd: path.join(__dirname, "serialport"),
// });
// console.log("directory");
// console.log(__dirname);
// console.log(app.getAppPath());
// // console.log(path.join(__dirname, "..", "serialport"));

// server.on("error", (err) => {
//  console.error("Error:", err);
// });

// server.on("exit", (code, signal) => {
//  console.log(`Child process exited with code ${code} and signal ${signal}`);
// });
function sendToRender(win) {
 var i = 0;
 const job = schedule.scheduleJob("* * * * * *", function () {
  // console.log('every second',i);
  // win.webContents.send('shedule', i);

  i++;
 });

 // console.log("job",job)
}

protocol.registerSchemesAsPrivileged([
 { scheme: "app", privileges: { secure: true, standard: true } },
]);

async function createWindow() {
 // Create the browser window.
 const win = new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
   devTools: true,
   nodeIntegration: true,
   plugins: true,
   contextIsolation: false,
   enableRemoteModule: true,
   webviewTag: true,
   webSecurity: false,
  },
 });

 sendToRender(win);
 if (process.env.WEBPACK_DEV_SERVER_URL) {
  // Load the url of the dev server if in development mode
  await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
  if (!process.env.IS_TEST) win.webContents.openDevTools();
 } else {
  createProtocol("app");
  // Load the index.html when not in development
  win.loadURL("app://./index.html");
 }
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
 // On macOS it is common for applications and their menu bar
 // to stay active until the user quits explicitly with Cmd + Q
 if (process.platform !== "darwin") {
  app.quit();
 }
});

app.on("activate", () => {
 // On macOS it's common to re-create a window in the app when the
 // dock icon is clicked and there are no other windows open.
 if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
 if (isDevelopment && !process.env.IS_TEST) {
  // Install Vue Devtools
  try {
   await installExtension(VUEJS_DEVTOOLS);
  } catch (e) {
   console.error("Vue Devtools failed to install:", e.toString());
  }
 }
 createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
 if (process.platform === "win32") {
  process.on("message", (data) => {
   if (data === "graceful-exit") {
    app.quit();
   }
  });
 } else {
  process.on("SIGTERM", () => {
   app.quit();
  });
 }
}
