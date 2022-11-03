<template>
  <v-app>
    <v-app-bar
      app
      color="#43386A"
      dark
    >
    <!-- <v-icon @click="$router.go(-1)">mdi-arrow-left-thick</v-icon>
        <v-icon @click="$router.go(-1)">mdi-arrow-left-thick</v-icon> -->
      <!-- <div class="d-flex align-center">
   
      </div> -->

<img style="max-width:65px" src="logo.png" alt="">
      <v-spacer></v-spacer>

<div style="margin-right:10px">Machine</div> 
<!-- {{$store.state.setup.checkMachine}} -->
{{$store.state.setup.watchMachine}}

<div style="background:white;padding:10px;">
<v-icon  v-if="$store.state.setup.checkEmbededDevice" style="color:green">mdi-power-plug</v-icon>
<v-icon v-else style="color:red">mdi-power-plug-off</v-icon>
<v-icon  v-if="$store.state.setup.checkMachine" style="color:green">mdi-power</v-icon>
<v-icon v-else style="color:red">mdi-power</v-icon>
        </div>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
/*eslint-disable*/
import io from 'socket.io-client'
import moment from 'moment'
// import { Chart, registerables } from 'chart.js';
// Chart.register(...registerables);
/*eslint-disable*/
// window.ipcRenderer = require("electron").ipcRenderer;
const ipcRenderer = window.require("electron").ipcRenderer;
import * as oee from '../src/core/oee'
var isMachineStatus=false;
var liveMachine=[];
export default {
  name: 'App',

  data: () => ({
    //
  }),

  mounted(){
    var $vm=this;
             // Synchronous message emmiter and handler
        //  console.log(ipcRenderer.sendSync('shedule', 'sync ping')) 

        //  // Async message handler

  const socket = io("http://127.0.0.1:4444");

$vm.$store.commit('setEmbededStatus',isMachineStatus)
$vm.$store.commit('setMachineStatus',false)

socket.on('connect_failed', function(){
  
    console.log('Connection Failed');
});

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
$vm.$store.commit('setMachineStatus',result.machine)
// console.log("embeded",result)
$vm.$store.commit('setEmbededStatus',true)
$vm.$store.commit('machineLiveData',result)
//----------watch machine  on/off changes-------
// if($vm.$store.state.watchMachine!=result.machineStatus)
// {
//   liveMachine.push({...result,date:moment()})
//   $vm.$store.commit('watchMachine',result.machineStatus)
// }

})

// console.log("live machine",liveMachine)
 
         ipcRenderer.on('shedule', (event, arg) => {
            console.log(arg)
         })
oee.calculation()
         // Async message sender
        //  ipcRenderer.send('asynchronous-message', 'async ping')

$vm.$store.commit('setDate')
$vm.setTimeEverySecond()
  },
  watch:{
"$store.state.setup.checkMachine":{
  handler(value){
    var $vm=this;
console.log("macchine state",value)
  liveMachine.push({...$vm.$store.state.setup.machineLiveData,date:moment()})
console.log("Live Machine",liveMachine)
  },deep:true
}
  },

  methods:{

setTimeEverySecond(){
var $vm=this;
  setInterval(() => {
    $vm.$store.commit('setTimeEverySecond')
  }, 1);
}


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