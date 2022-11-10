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
              <shift-widget></shift-widget>
              <emp-login-widget></emp-login-widget>
              <machine-widget></machine-widget>
    </v-app>
</template>


<script>
/*eslint-disable*/
import * as tracker from '../src/core/tracker'
import * as socketConfig from '../src/core/socketConfig'

var moment = require('moment');
import lodash from 'lodash'
import * as config from '../src/core/config.js'
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
        console.log($vm.$store.state.db)
//----------------socket config-------------------


socketConfig.initSerialPort($vm)
//----------------socket config-------------------

         ipcRenderer.on('shedule', (event, arg) => {
            console.log(arg)
         })
          oee.calculation()
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
},
"$store.state.setup.selected_shift":{
  handler(value){
    var $vm=this;
    tracker.tracker($vm)
  },deep:true
}
,
"$store.state.setup.selected_employee":{
  handler(value){
    var $vm=this;
    tracker.tracker($vm)
  },deep:true
}
,
"$store.state.setup.selected_product":{
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