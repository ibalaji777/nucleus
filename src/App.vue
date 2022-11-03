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
{{currentTime}}{{$store.state.setup.watchMachine}}

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
var moment = require('moment');
import lodash from 'lodash'
// import { Chart, registerables } from 'chart.js';
// Chart.register(...registerables);
/*eslint-disable*/
// window.ipcRenderer = require("electron").ipcRenderer;
const ipcRenderer = window.require("electron").ipcRenderer;
import * as oee from '../src/core/oee'
import { v4 as uuidv4 } from 'uuid';
var isMachineStatus=false;
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

  const socket = io("http://127.0.0.1:4444");

$vm.$store.commit('setEmbededStatus',isMachineStatus)
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
    
"$store.state.setup.checkMachine":{
  handler(value){
    var $vm=this;
//ok
var shift={
  shift_id:$vm.$store.state.setup.selected_shift.id,
  shift_name:$vm.$store.state.setup.selected_shift.name,
}
//ok
var selected_machine={
  machine_id:'',
  machine_name:'',
 
}
//ok
var selected_product={
  product_id:$vm.$store.state.setup.selected_product.id,
  product_name:$vm.$store.state.setup.selected_product.name,
  part_no:$vm.$store.state.setup.selected_product.part_no,
  material_code:$vm.$store.state.setup.selected_product.material_code,
 
}
//ok
var selected_employee={
  emp_id:$vm.$store.state.setup.selected_employee.id,
  emp_name:$vm.$store.state.setup.selected_employee.name,


}
var runningMachine=$vm.$store.state.setup.machineLiveData;

if(!_.isEmpty(runningMachine))
//

var createMachineEntryParent=
{

company_id:$vm.$store.state.setup.selected_company.id,
branch_id:$vm.$store.state.setup.selected_company.id,
machine_client_id:$vm.$store.state.setup.selected_machine.id+new Date().valueOf(),
machine_id:$vm.$store.state.setup.selected_machine.id,
machine_name:$vm.$store.state.setup.selected_machine.name,
date:moment().format('YYY-MM-DD'),
start_time:moment().format(),//must
end_time:'',//must
date:moment().format("YYYY-MM-DD"),
selectedStrokeType:'manual',//auto or manual
production_per_stroke_auto:'',
production_per_stroke_manual:'', 
running_machine:[],
planned_hours:8,
// breaks:[],
...shift,
...selected_employee
};

//CHECKING PLANNED
var currentMachine={
  stroke:parseFloat().toFixed(2),
  machine_id:$vm.$store.state.setup.selected_machine.id,
  machine_name:$vm.$store.state.setup.selected_machine.name,
  machine_date:new moment().format("YYYY-MM-DD"),
  machine_time:new moment().format("hh:mm:ss"),
  machine_active_status:runningMachine.machine?'ON':'OFF',
  //in work--progress
  break_type:runningMachine.machine?'NONE':'UNPLANNED/PLANNED',
  break_reason:runningMachine.machine?'Tea Break':'UNPLANNED',
  // break_id:runningMachine.machine?'Tea Break':'UNPLANNED',


}

var prepare={
  ...shift,
  ...selected_machine,
  ...selected_product,
  ...selected_employee,
 ...currentMachine,
  // ...$vm.$store.state.setup.machineLiveData,
  // machine_date:new moment().format("YYYY-MM-DD"),
  // machine_time:new moment().format("hh:mm:ss")
}
console.log("macchine state",value)
  liveMachine.push(prepare)
  liveMachine=_.uniqBy(liveMachine,'stroke')
  
console.log("Live Machine",liveMachine)
  },deep:true
}
  },

  methods:{

// setTimeEverySecond(){
// var $vm=this;
//   setInterval(() => {
//     $vm.$store.commit('setTimeEverySecond')
//   }, 1);
// }


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