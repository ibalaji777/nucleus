<template>
 <v-app>
  <div
   style="display: flex"
   v-if="!['machineLogin'].includes($route.name)"
   app
   class="headerBg"
  >
   <img
    @click="
     $store.commit('setDialog', { key: 'demoMachineDialog', value: true })
    "
    style="max-width: 65px; cursor: pointer"
    src="logo.png"
    alt=""
   />
   <!-- <img  style="max-width: 65px;" src="logo.png" alt="" /> -->
   <v-spacer></v-spacer>

   <div style="padding: 10px">
    <v-icon v-if="$store.state.setup.checkEmbededDevice" style="color: green"
     >mdi-power-plug</v-icon
    >
    <v-icon v-else style="color: red">mdi-power-plug-off</v-icon>
    <span style="color: black">|</span>
    <v-icon v-if="$store.state.setup.checkMachine" style="color: green"
     >mdi-power</v-icon
    >
    <v-icon v-else style="color: red">mdi-power</v-icon>
   </div>
   <v-btn text @click="machineLogout">Logout</v-btn>
  </div>

  <v-main>
   <router-view />
  </v-main>
  <demo-machine-dialog></demo-machine-dialog>
  <!-- --dialog-- -->
  <machine-action-dialog></machine-action-dialog>
  <product-widget></product-widget>
  <shift-widget></shift-widget>
  <emp-login-widget></emp-login-widget>
  <machine-widget></machine-widget>
  <!-- <load-material-dialog></load-material-dialog> -->
  <select-employee-widget></select-employee-widget>
  <select-machine></select-machine>
  <select-product></select-product>
  <history-dialog></history-dialog>
  <close-shift-widget></close-shift-widget>
  <oee-setup-dialog></oee-setup-dialog>
  <logs-dialog></logs-dialog>
  <edit-logs-dialog></edit-logs-dialog>
  <errors-dialog></errors-dialog>
  <device-dialog></device-dialog>
 </v-app>
</template>

<script>
/*eslint-disable*/
// import * as tracker from "../src/core/tracker";
import * as config from "../src/core/config";
import _ from "lodash";
import io from "socket.io-client";
const bgSocket = io(config.backend);

import * as utils from "./core/utils.js";

var moment = require("moment");
import lodash from "lodash";
const ipcRenderer = window.require("electron").ipcRenderer;
import * as oee from "../src/core/oee";
import { v4 as uuidv4 } from "uuid";
import historyDialog from "./views/historyDialog.vue";

import * as machine from "../src/core/machine.js";
const socket = io(config.serialPortUrl);

function handleErrors($vm, err) {
 console.log(err);
}
// const { SerialPort } = require('serialport')

// async function listSerialPorts() {
//  await SerialPort.list().then((ports, err) => {
//   if (err) {
//    console.log(err.message);
//    return;
//   } else {
//    // document.getElementById('error').textContent = ''
//   }
//   console.log("ports", ports);

//   if (ports.length === 0) {
//    console.log("No ports discovered");
//   }

//   console.log(ports);

//   // tableHTML = tableify(ports)
//   // document.getElementById('ports').innerHTML = tableHTML
//  });
// }

// function listPorts() {
//  listSerialPorts();
//  setTimeout(listPorts, 2000);
// }

// // Set a timeout that will check for new serialPorts every 2 seconds.
// // This timeout reschedules itself.
// setTimeout(listPorts, 2000);

// listSerialPorts();
// const { SerialPort, ReadlineParser } = require("serialport");
// const Readline = require("@serialport/parser-readline");

// const writeDelay = 2000; // reducing this value stops it working
// const path = "COM9"; //windows
// // const path = '/dev/ttyACM0';//rasobert pi
// const port = new SerialPort({ path, lock: false, baudRate: 9600 });

// port.on("open", () => {
//  setTimeout(function () {
//   console.log("sending: ping");
//   port.write("ping");
//  }, writeDelay);
// });

// const parser = new ReadlineParser({ delimiter: "\r\n" });

// port.pipe(parser);

// parser.on("data", function (data) {
//  console.log("from arduino:", data);
//  io.sockets.emit("readData", data);
// });

// var isMachineStatus=false;
var liveMachine = [];
export function initSerialPort($vm) {
 $vm.$store.commit("setEmbededStatus", false);
 $vm.$store.commit("setMachineStatus", false);

 socket.on("connect_failed", function () {
  console.log("Connection Failed");
 });

 socket.on("connect_error", (err) => handleErrors($vm, err));
 socket.on("connect_failed", (err) => handleErrors($vm, err));
 socket.on("disconnect", (err) => handleErrors($vm, err));
 socket.on("readData", async (data) => {
  console.log(data);

  var dataset = JSON.parse(data);
  var machineStatus = dataset.machine == 1 ? true : false;
  var result = { ...dataset, machine: machineStatus };
  //machine in continues mode and signal
  $vm.$store.commit("setMachineStatus", result.machine);
  //serial port started read
  $vm.$store.commit("setEmbededStatus", true);
  //live data from machine
  $vm.$store.commit("machineLiveData", result);
  // console.log("embeded",result)
 });
}
export default {
 components: { historyDialog },
 name: "App",

 data: () => ({
  currentTime: new moment().format("hh:mm"),
 }),

 async mounted() {
  var $vm = this;

  //fetch data
  let username = $vm.$store.state.login.username;
  let password = $vm.$store.state.login.password;
  if (username != "" && password != "") {
   await $vm.$store.dispatch("MACHINE_LOGIN", {
    username,
    password,
   });
  }

  console.log("Route Name", $vm.$route.name);
  //----------------socket config-------------------
  //   initSerialPort($vm);
  //   socketConfig.initSerialPort($vm);
  // await  machine.listentShift();
  await machine.listenMachineDemo();
  //----------------socket config-------------------

  ipcRenderer.on("shedule", (event, arg) => {
   console.log(arg);
  });
  $vm.$store.dispatch("GET_PRODUCTS");
  utils.getRunningMachineData($vm);
  await $vm.$store.dispatch("GET_MACHINE_STATUS_BY_DATE");
  oee.calculation();
 },
 watch: {
  currentTime: {
   handler() {
    var $vm = this;
    console.log(this.currentTime);
   },
   deep: true,
  },
  //-------------------WATCH MACHINE ON/OFF STATUS --------------------------
  "$store.state.setup.checkMachine": {
   handler(value) {
    var $vm = this;
    console.log("check Machine", value);
    machine.startSignal(value);
    // $vm.tracker();
   },
   deep: true,
  },
  "$store.state.setup.selected_shift": {
   handler(value) {
    var $vm = this;
    machine.machineEventTermination();
    // $vm.tracker();
   },
   deep: true,
  },
  "$store.state.setup.selected_employee": {
   handler(value) {
    var $vm = this;
    // $vm.tracker();
   },
   deep: true,
  },
  "$store.state.setup.selected_product": {
   handler(value) {
    var $vm = this;
    machine.machineEventTermination();

    // $vm.tracker();
   },
   deep: true,
  },
  "$store.state.machineData": {
   handler(value) {
    var $vm = this;
    if (
     $vm.$store.state.machineData.machineHisotry.length != 0 &&
     $vm.$store.state.setup.watchMachine
    )
     $vm.$store.dispatch("syncToServer");

    // $vm.tracker();
   },
   deep: true,
  },

  global_runTime_production_count: {
   handler(value) {
    var $vm = this;

    $vm.$store.commit("MACHINE_LOG_UPDATE", {
     actual_count: value,
    });

    console.log("actual production watcher", value);
   },
   deep: true,
  },
 },

 methods: {
  machineLogout() {
   var $vm = this;
   $vm.$confirm("Do You Want to logout from Machine?").then(() => {
    $vm.$store.commit("logout");
    $vm.$store.commit("CLEAR_COMPANY");
    $vm.$store.commit("CLEAR_EMPLOYEE");
    $vm.$router.push({ name: "machineLogin" });
   });
  },
  // tracker() {
  //  var $vm = this;
  //  //it only allows the shift and employee
  //  // if($vm.$store.state.setup.checkEmbededDevice){
  //  tracker.tracker($vm, (data) => {
  //   console.log("tracker", data);
  //   bgSocket.emit(
  //    "SK_IO_INSERT_MACHINE_ACTIVITY",
  //    data.SK_IO_CREATE_MACHINE_ACTIVITY
  //   );
  //   _.map(data.SK_IO_INSERT_MACHINE_PART_NO, (data) => {
  //    bgSocket.emit("SK_IO_INSERT_MACHINE_PART_NO", data);
  //   });
  //   bgSocket.emit("SK_IO_INSERT_MACHINE_MAIN", data.SK_IO_INSERT_MACHINE_MAIN);
  //   $vm.$store.commit(
  //    "LOCAL_SK_IO_MACHINE_PART_NO",
  //    data.SK_IO_INSERT_MACHINE_PART_NO
  //   );

  //   //new oee
  //   utils.getRunningMachineData($vm);
  //   oee.oeePreset($vm);
  //   oee.oeeCalculation($vm);
  //  });
  //  // }
  // },
 },
};
</script>
<style lang="scss">
* {
 font-family: "Poppins", sans-serif;
}
.machineStatus {
 background: white;
 padding: 5px;
 border-radius: 10px;
}
.theme--light.v-application {
 background: #f8f9fa !important;
}
.headerBg {
 background: #f8f9fa !important;
}
.bg-gradient-dark {
 background-image: linear-gradient(310deg, #141727 0%, #3a416f 100%);
}
.oeeContainer {
 display: flex;
 max-width: 100% !important;
 flex-wrap: wrap;
 box-shadow: 0 1px 4px 0 rgb(0 0 0 / 14%);
 border: 2px solid;
}

.timeChart {
 box-shadow: 0 1px 4px 0 rgb(0 0 0 / 14%);
 background: white;
}
.oeeContainer .oeeWidget {
 width: 16vw;
 box-shadow: 0 1px 4px 0 rgb(0 0 0 / 14%);

 margin: 15px;
 padding: 1px;
 background: white;
 border-radius: 4%;
 box-shadow: 0 1px 4px 0 rgb(0 0 0 / 14%);
}

// .oeeContainer > div {

// }

.toolbar_container {
 display: flex;
 padding: 10px;
}
.toolbar_container > div {
 width: 100px;
 height: 100px;
 display: flex;
 justify-content: center;
 align-items: center;
 color: gray;
 margin: 2px;
 box-shadow: 0px 1px 5px -1px black;
 background: azure;
 font-weight: 600;
 border-radius: 4px;
}
.toolbar_container .center {
 text-align: center;
}
.widgetContainer {
 width: 100%;
 display: flex;
 // margin-top:10px;
 justify-content: center;
}
.widgetContainer .widget {
 box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
 width: 250px;
 /* height: 57px; */
 justify-content: center;
 align-items: center;
 display: flex;

 margin: 1px;
 padding: 13px;
 background: #2f4f6f;
 color: white;
}
.pointer {
 cursor: pointer;
}
.widgetGroup {
 padding: 10px;
 background: white;
 margin: 3px;
 cursor: pointer;
 border-radius: 3px;
 box-shadow: 5px 5px 10px #727272, -5px -5px 10px #ffffff;
}
.widgetGroup:hover {
 background: lightgray;
}
.widgetGroupContainer {
 display: flex;
}
.widgetTitle {
 // background: #f58181;
 padding: 5px;
 // color: white;
 font-weight: 700;
 font-size: 16px;
}
.widgetBlueTitle {
 background: cornflowerblue;
 padding: 5px;
 color: white;
 font-size: 15px;
 text-align: center;
}

.border-radius-md {
}
.icon-shape {
 width: 98px;
 height: 98px;
 background-position: center;
 border-radius: 0.75rem;
}
.bg-gradient-primary {
 background-image: linear-gradient(310deg, #7928ca 0%, #ff0080 100%);
}

.text-center {
 text-align: center !important;
}
.shadow {
 box-shadow: 0 0.3125rem 0.625rem 0 rgba(0, 0, 0, 0.12) !important;
}
.p10 {
 padding: 0 10px;
}
.raduius10 {
 border-radius: 10px;
}
.white {
 color: white;
}
.icon {
 fill: currentColor;
 stroke: none;
}
.icon {
 display: inline-block;
 display: flex;
 justify-content: center;
 align-items: center;
 height: 4em;
 width: 4em;
 border-radius: 16px;
}
.icon {
 fill: currentColor;
 stroke: none;
}
.cardN {
 background: white;
 box-shadow: 0 20px 27px 0 rgba(0, 0, 0, 0.05);
}
.cardTStyle {
 font-weight: 700;
}
.cardCCol {
 margin: 4px 0px;
}
.cards2 {
 display: flex;
 justify-content: space-evenly;
 flex-wrap: wrap;
 width: 100%;
 padding: 2px;
}
.cards2 span {
 margin: 3px;
}
.cards3 {
 display: flex;
 justify-content: space-evenly;
 flex-wrap: wrap;
 width: 100%;
 padding: 2px;
}
.cards3 div {
 margin: 3px;
}
</style>
