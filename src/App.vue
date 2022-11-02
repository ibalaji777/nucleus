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

<div style="margin-right:10px">Machine</div> <div style="color:green"  class="machineStatus" 
 v-if="$store.state.setup.checkEmbededDevice">
  <v-icon style="color:green">mdi-power-plug</v-icon>
</div>
        <div class="machineStatus" style="color:red;" v-else>
<v-icon style="color:red">mdi-power-plug-off</v-icon>

        </div>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import io from 'socket.io-client'

// import { Chart, registerables } from 'chart.js';
// Chart.register(...registerables);
/*eslint-disable*/
// window.ipcRenderer = require("electron").ipcRenderer;
const ipcRenderer = window.require("electron").ipcRenderer;
import * as oee from '../src/core/oee'
var isMachineStatus=false;
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

socket.on('connect_failed', function(){
  
    console.log('Connection Failed');
});

function handleErrors(err)
{
  $vm.$store.commit('setEmbededStatus',false)

  console.log("Failed to connect")
}
socket.on('connect_error', err => handleErrors(err))
socket.on('connect_failed', err => handleErrors(err))
socket.on('disconnect', err => handleErrors(err))
  socket.on("readData", async (data) => {
console.log((JSON.parse(data)))
// console.log("socket",JSON.parse(data),typeof Object(data))
var embededData=data
// $vm.$store.commit('setMachineStatus',embededData.machine)

$vm.$store.commit('setEmbededStatus',true)
 })
 
         ipcRenderer.on('shedule', (event, arg) => {
            console.log(arg)
         })
oee.calculation()
         // Async message sender
        //  ipcRenderer.send('asynchronous-message', 'async ping')

$vm.$store.commit('setDate')
$vm.setTimeEverySecond()
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