<template>
 <div class="home">
  <!-- <div class="toolbar_container">

  <div @click="$router.push('createCompany')">
    <div class="center" >
      <v-icon>mdi-plus</v-icon><br>
      <span style="font-size:12px">Company</span>
    </div>
  </div>

  <div @click="$router.push('createGroup')">
    <div class="center" >
      <v-icon>mdi-plus</v-icon><br>
      <span style="font-size:12px">Create Group</span>
    </div>
  </div>

  <div @click="$router.push('dashboard')">
    <div class="center" >
      <v-icon>mdi-plus</v-icon><br>
      <span style="font-size:12px">Dashboard</span>
    </div>
  </div>

  <div @click="$router.push('dashboardMachine')">
    <div class="center" >
      <v-icon>mdi-plus</v-icon><br>
      <span style="font-size:12px">Machine</span>
    </div>
  </div>
    <div @click="$router.push('selectMachine')">
    <div class="center" >
      <v-icon>mdi-plus</v-icon><br>
      <span style="font-size:12px"> Select Machine</span>
    </div>
  </div>
  <div @click="$router.push('selectMachine')">
    <div class="center">
      <v-icon>mdi-plus</v-icon><br>
      <span style="font-size:12px"> Create User</span>
    </div>
  </div>
 <div @click="$router.push('createShift')">
    <div class="center">
      <v-icon>mdi-plus</v-icon><br>
      <span style="font-size:12px"> Create Shift</span>
    </div>
  </div>
</div> -->

  <!-- <time-chart-status></time-chart-status> -->
  <!-- <stackbar-chart></stackbar-chart>     -->
  <!-- <time-chart></time-chart>     -->

  <!-- <time-chart-status></time-chart-status> -->
  <!-- <heat-map></heat-map> -->
  <time-chart-status2></time-chart-status2>
  <div class="oeeContainer">
   <div>
    <percentage-chart
     :role="'OEE'"
     :color="$store.state.bgColor.oee"
     :chartData="10"
     :title="'OEE'"
    ></percentage-chart>
   </div>

   <div>
    <percentage-chart
     :role="'AVAILABILITY'"
     :color="$store.state.bgColor.availability"
     :chartData="10"
     :title="'Availability'"
    ></percentage-chart>
   </div>
   <div>
    <percentage-chart
     :role="'QUALITY'"
     :color="$store.state.bgColor.quality"
     :chartData="90"
     :title="'Quality'"
    ></percentage-chart>
   </div>
   <div>
    <percentage-chart
     :role="'PERFORMANCE'"
     :color="$store.state.bgColor.performance"
     :chartData="80"
     :title="'Performance'"
    ></percentage-chart>
   </div>
  </div>

  <!-- <div style="width:300px">
<percentage-chart :chartData="10" :title="'Quality'"></percentage-chart>
</div> -->

  <!-- <doughnut-chart></doughnut-chart> -->

  <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

  <!-- We are using Node.js <span id="node-version"></span>, Chromium <span id="chrome-version"></span>, Electron <span id="electron-version"></span>, and Serialport <span id="serialport-version"></span>

    <div id="error"></div>
    <div id="ports"></div> -->
 </div>
</template>
<script>
/*eslint-disable*/
import io from 'socket.io-client'

        // //load serialport module
        // const serialPort = require('serialport');
        // const Readline = serialPort.parsers.Readline;

        // //initialize serialport with 115200 baudrate.
        // var sp = new serialPort('/dev/ttyUSB0', {
        //     baudRate: 115200,
        // });

export default {
 name: "Home",
 mounted(){
  const socket = io("http://127.0.0.1:4444");

  socket.on("readData", async (data) => {

console.log("socket",data)
 })
 }
};
</script>

<style lang="scss">
.oeeContainer {
 display: flex;
 max-width: 100% !important;
 justify-content: center;
 // overflow:hidden
}

.oeeContainer div {
 width: 200px;
 box-shadow: 8px 0px -1px 0px black;
 margin: 15px;
 padding: 1px;
}

.oeeContainer > div {
 background: #fdfdfd;
 width: 250px;
 box-shadow: 0px 0px 6px 2px;
 border-radius: 4%;
}

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
</style>
