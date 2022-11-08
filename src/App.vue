<template>
    <v-app>
        <v-app-bar app color="#43386A" dark>
               <img  @click="$store.commit('setDialog',{key:'demoMachineDialog',value:true})" style="max-width: 65px;cursor:pointer" src="logo.png" alt="" />
                <!-- <img  style="max-width: 65px;" src="logo.png" alt="" /> -->
            <v-spacer></v-spacer>

   
            <div style="background: white; padding: 10px;">
                <v-icon v-if="$store.state.setup.checkEmbededDevice" style="color: green;">mdi-power-plug</v-icon>
                <v-icon v-else style="color: red;">mdi-power-plug-off</v-icon>
                <span style="color: black;">|</span>
                <v-icon v-if="$store.state.setup.checkMachine" style="color: green;">mdi-power</v-icon>
                <v-icon v-else style="color: red;">mdi-power</v-icon>
            </div>
        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>
              <demo-machine-dialog></demo-machine-dialog>
              <!-- --dialog-- -->
              <product-widget></product-widget>
    </v-app>
</template>


<script>
/*eslint-disable*/
import * as tracker from '../src/core/tracker'
import io from 'socket.io-client'
var moment = require('moment');
import lodash from 'lodash'
// import { Chart, registerables } from 'chart.js';
// Chart.register(...registerables);
/*eslint-disable*/
// window.ipcRenderer = require("electron").ipcRenderer;
const ipcRenderer = window.require("electron").ipcRenderer;
import * as oee from '../src/core/oee'
import { v4 as uuidv4 } from 'uuid';
// var isMachineStatus=false;
var liveMachine=[];
export default {
  name: 'App',

  data: () => ({
    currentTime:new moment().format('hh:mm')
  }),

  mounted(){
    var $vm=this;
             // Synchronous message emmiter and handler
        //  console.log(ipcRenderer.sendSync('shedule', 'sync ping')) 

        //  // Async message handler
        console.log($vm.$store.state.db)
if($vm.$store.state.dialog.isDemoPlugin){
  const socket = io("http://127.0.0.1:4444");

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
if(currentShift.length!=0)
$vm.$store.commit('setShift',currentShift[0])

},700)

function handleErrors(err)
{
$vm.$store.commit('setEmbededStatus',false)
$vm.$store.commit('setMachineStatus',false)
  console.log("Failed to connect")
}
socket.on('connect_error', err => handleErrors(err))
socket.on('connect_failed', err => handleErrors(err))
socket.on('disconnect', err => handleErrors(err))
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
//end socket finished
// console.log("live machine",liveMachine)
 
         ipcRenderer.on('shedule', (event, arg) => {
            console.log(arg)
         })
oee.calculation()
         // Async message sender
        //  ipcRenderer.send('asynchronous-message', 'async ping')

// $vm.$store.commit('setDate')
// $vm.setTimeEverySecond()
  },
  watch:{
currentTime:{
handler(){
var $vm=this;
console.log(this.currentTime)
},
deep:true
},
//-------------------WATCH MACHINE ON/OFF STATUS --------------------------    
"$store.state.setup.checkMachine":{
  handler(value){
    var $vm=this;
    tracker.tracker($vm)
  },deep:true
}
  },

  methods:{

  }
};
</script>
<style lang="scss">
  .machineStatus{
    background: white;
    padding: 5px;
    border-radius: 10px;
  }
</style>