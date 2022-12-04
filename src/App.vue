<template>
 <v-app>
  <v-app-bar v-if="!['machineLogin'].includes($route.name)" app color="#43386A" dark>
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

   <div style="background: white; padding: 10px">
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
  </v-app-bar>

  <v-main>
   <router-view />
  </v-main>
  <demo-machine-dialog></demo-machine-dialog>
  <!-- --dialog-- -->
  <product-widget></product-widget>
  <shift-widget></shift-widget>
  <emp-login-widget></emp-login-widget>
  <machine-widget></machine-widget>
  <load-material-dialog></load-material-dialog>
  <select-employee-widget></select-employee-widget>
  <select-machine></select-machine>
  <select-product></select-product>
  <history-dialog></history-dialog>
  <close-shift-widget></close-shift-widget>
 </v-app>
</template>

<script>
/*eslint-disable*/
import * as tracker from "../src/core/tracker";
import * as config from '../src/core/config'
import _ from 'lodash'
import io from 'socket.io-client'
const bgSocket = io(config.backend);
import * as utils from './core/utils.js'

var moment = require("moment");
import lodash from "lodash";
const ipcRenderer = window.require("electron").ipcRenderer;
import * as oee from "../src/core/oee";
import { v4 as uuidv4 } from "uuid";
import historyDialog from './views/historyDialog.vue';
// var isMachineStatus=false;
var liveMachine = [];
export function initSerialPort($vm){

    if($vm.$store.state.dialog.isDemoPlugin){
        const socket = io(config.serialPortUrl);
      
      $vm.$store.commit('setEmbededStatus',false)
      $vm.$store.commit('setMachineStatus',false)
      
      socket.on('connect_failed', function(){
       
          console.log('Connection Failed');
      });
      
      setInterval(()=>{
      $vm.$store.commit('setTimeEverySecond')
      $vm.$store.commit('setDate')
      var currentTime=$vm.$store.state.setup.time;
      var currentShift=_.filter($vm.$store.state.db.shifts,(x)=>{
      if(x.start_time <= currentTime&&x.end_time >= currentTime) return true;
      return false;
      })
      if(currentShift.length!=0&&$vm.$store.state.setup.selected_shift.id!=currentShift[0].id)
      $vm.$store.commit('setShift',currentShift[0])
      
      },700)
      
   
      socket.on('connect_error', err => handleErrors($vm,err))
      socket.on('connect_failed', err => handleErrors($vm,err))
      socket.on('disconnect', err => handleErrors($vm,err))
      socket.on("readData", async (data) => {
      
      
      var dataset=JSON.parse(data);
      var machineStatus=dataset.machine==1?true:false
      var result={...dataset,machine:machineStatus}
      //machine in continues mode and signal
      $vm.$store.commit('setMachineStatus',result.machine)
      //serial port started read
      $vm.$store.commit('setEmbededStatus',true)
      //live data from machine 
      $vm.$store.commit('machineLiveData',result)
      // console.log("embeded",result)
      
      
      })
      }
}
export default {
  components: { historyDialog },
 name: "App",

 data: () => ({
  currentTime: new moment().format("hh:mm"),
 }),

async mounted() {
  var $vm = this;
  console.log($vm.$store.state.db);
  //----------------socket config-------------------
// initSerialPort($vm)
  // socketConfig.initSerialPort($vm)
  //----------------socket config-------------------

  ipcRenderer.on("shedule", (event, arg) => {
   console.log(arg);
  });
   $vm.$store.dispatch('GET_PRODUCTS')
   utils.getRunningMachineData($vm)
  await $vm.$store.dispatch("GET_MACHINE_STATUS_BY_DATE")
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
    console.log(value)
 $vm.tracker()
   },
   deep: true,
  },
  "$store.state.setup.selected_shift": {
   handler(value) {
    var $vm = this;
    $vm.tracker()
   },
   deep: true,
  },
  "$store.state.setup.selected_employee": {
   handler(value) {
    var $vm = this;
    $vm.tracker()
   },
   deep: true,
  },
  "$store.state.setup.selected_product": {
   handler(value) {
    var $vm = this;
  $vm.tracker()
   },
   deep: true,
  },
 },

 methods: {
  machineLogout(){
var $vm=this;
$vm.$confirm("Do You Want to logout from Machine?")
.then(()=>{
$vm.$store.commit('MACHINE_LOGOUT')
$vm.$store.commit('CLEAR_COMPANY')
$vm.$store.commit('CLEAR_EMPLOYEE')
$vm.$router.push({name:'machineLogin'})
})

  },
tracker(){
  var $vm =this;
  //it only allows the shift and employee 
  // if($vm.$store.state.setup.checkEmbededDevice){
   tracker.tracker($vm,(data)=>{
  console.log("tracker",data)
  bgSocket.emit('SK_IO_INSERT_MACHINE_ACTIVITY',data.SK_IO_CREATE_MACHINE_ACTIVITY);
  _.map(data.SK_IO_INSERT_MACHINE_PART_NO,(data)=>{
  bgSocket.emit('SK_IO_INSERT_MACHINE_PART_NO',data);
    })
  bgSocket.emit('SK_IO_INSERT_MACHINE_MAIN',data.SK_IO_INSERT_MACHINE_MAIN);
  $vm.$store.commit('LOCAL_SK_IO_MACHINE_PART_NO',data.SK_IO_INSERT_MACHINE_PART_NO)
   
//new oee 
utils.getRunningMachineData($vm)

oee.oeeCalculation($vm)
 });
  // }
}

 },
};
</script>
<style lang="scss">
.machineStatus {
 background: white;
 padding: 5px;
 border-radius: 10px;
}
</style>
