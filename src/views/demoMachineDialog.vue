<template>
    <div>
        <v-dialog v-model="$store.state.dialog.demoMachineDialog" fullscreen hide-overlay transition="dialog-bottom-transition" persistent>
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="$store.commit('setDialog',{key:'demoMachineDialog',value:false})">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Demo Machine</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items> </v-toolbar-items>
                </v-toolbar>
                <div style="padding: 10px;">


<div v-for="(items, index) in $store.state.db.shedule" :key="index+'shedile'">
{{items}}
</div>


<div>
    <div>a1</div>
    <div>a2</div>
</div>



                    {{globalDownTime}}


<change-widget></change-widget>
<div style="display:flex;justify-content:space-even">
<v-btn dark color="primary"   @click="$store.commit('setDialog',{key:'isDemoPlugin',value:!$store.state.dialog.isDemoPlugin})">

Plugin  
<div  v-if="$store.state.dialog.isDemoPlugin">
ON
</div>
<div v-else>OFF</div>
</v-btn>

<v-btn dark color="primary" @click="switchMachine">
machine
<div  v-if="machine">
ON
</div>
<div v-else>OFF</div>

</v-btn>

<v-btn dark color="primary" @click="clear">
Clear
</v-btn>
<v-btn dark color="primary" @click="remove">
Remove
</v-btn>

</div>
<br>
<div>
    <pre>
{{machineLogs}}
</pre>
</div>
machineSessionId
<div style="height:500px;overflow:scroll">
<pre>{{$store.state.setup.machineSessionId}}</pre>
</div>
machin entry child {{$store.state.setup.machineActivities.length}}

watch:
Live status
{{$store.state.setup.checkEmbededDevice}}
{{$store.state.setup.checkMachine}}
<h4>Machine Client Id:{{$store.state.setup.machineSessionId.machine_client_id}}</h4>
<h4>Running/Runned Product:{{globalRunningProducts}}||</h4>
<h4>Running/Runned Shift:{{globalRunningShifts.count}}</h4>
<h4>Running Employee:{{globalRunningEmps.count}}</h4>
<h4>How Many ON's(Active):{{globalRunningOn.count}}</h4>
<h4>How Many OFF's(Stoppes):{{globalRunningOff.count}}</h4>

<h4>Planned Stops:{{globalPlannedStops.count}}</h4>
<h4>UnPlannned Stops/DownTimes:{{globalUnPlannedStops.count}}</h4>
<h4>Max Stroke:{{globalMaxStroke.stroke}}</h4>

<div style="width:100vw;overflow:scroll">
<table class="demoMachinTable" >
<tr v-for="(item,index) in [$store.state.setup.machineActivities[0]]" :key="'child-'+index">
<td v-for="(cell,key,cell_index) in item" :key="'celdl'+cell_index">
{{key}}
</td>
    
<tr v-for="(item,index) in $store.state.setup.machineActivities" :key="'child'+index">
<td v-for="(cell,cell_index) in item" :key="'cell'+cell_index+index">
{{cell}}
</td>
<!-- {{item}} -->

</tr>

</table>

<div v-for="(item,index) in shedule" :key="'ss'+index">

<v-btn @click="SheduleOperation(item,'start')">start</v-btn>
<v-btn @click="SheduleOperation(item,'stop')">stop</v-btn>
</div>



</div>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>


export default {
data(){
    return{

shedule:[
    {
        id:1,
        name:'Tool setting',
        description:'',
        tme:"30"
    },
    {
        id:2,
        name:'Tool setting 2',
        description:'',
        time:"30"
    }
],
machineLogs:{},

stroke:0,
rpm:"",
machine:false,
inputState:false
    }
},    
methods:{
    SheduleOperation(){

    },
clear(){
this.stroke=0,
this.rpm="",
this.machine=false,
this.inputState=false

},
remove(){
var $vm=this;
$vm.$store.commit('removeMainActivity')

},
switchMachine(){
this.machine=!this.machine;
this.inputState=!this.inputState;


},
},
    mounted(){
var $vm=this;
setInterval(()=>{
    // console.log("timeline",$vm.$store.state.dialog.isDemoPlugin)
    if($vm.$store.state.dialog.isDemoPlugin)
{
//machine in continues mode and signal
$vm.$store.commit('setMachineStatus',$vm.machine)
//serial port started read
$vm.$store.commit('setEmbededStatus',$vm.machine)
//live data from machine 
var check={stroke:$vm.stroke,rpm:$vm.rpm,machine:$vm.machine,inputState:$vm.inputState}
$vm.$store.commit('machineLiveData',check)
// console.log("embeded",check)
$vm.machineLogs=check
$vm.stroke=parseFloat($vm.stroke||0)+1;
}
},1000)

    }
}
</script>
<style lang="scss">
    .demoMachinTable{
     width: 100%;
    height: 500px;
    overflow: scroll;
    border-collapse: collapse;
    }
    .demoMachinTable tr,td{
        border:1px solid black;
        padding:10px;
    }
        .demoMachinTable tr:nth-child(odd){
            background: lightblue;
        }
        .demoMachinTable tr:nth-child(even){
            background: grey;
        }

</style>