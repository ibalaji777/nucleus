<template>
    <div>
    <!-- eslint-disable -->
        <v-dialog v-model="$store.state.dialog.historyDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="$store.commit('setDialog',{key:'historyDialog',value:false})">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Machine History</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items> </v-toolbar-items>
                </v-toolbar>
                <!-- <div>
                <div style="display:flex;padding:10px;">
                <date @date="selected_date"></date>
                <v-btn @click="submit">Submit</v-btn>
               </div>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="machineStatusResult"
      :search="search"
    ></v-data-table>



</div> -->
<div style="padding:10px">
<h4>MACHINE ID:{{$store.state.setup.selected_machine.id}}  </h4>
<h4>MACHINE CODE:{{$store.state.setup.selected_machine.code}}  </h4>
<h4>MACHINE HOUR:{{$store.state.setup.selected_machine.hour}}  </h4>
<h4>MACHINE NAME:{{$store.state.setup.selected_machine.name}}  </h4>
<h4>MACHINE DESC:{{$store.state.setup.selected_machine.description}}  </h4>
<!-- {{$store.state.setup.machineSessionId}} -->
<div v-if="$store.state.setup.machineSessionId.machine_client_id!=''">
<h4>MACHINE SESSION:{{$store.state.setup.machineSessionId.machine_client_id}}  </h4>
<h4>IS MACHINE CLOSED:{{$store.state.setup.machineSessionId.isClosed}}  </h4>
<h4>MACHINE STARTED TIME:{{$store.state.setup.machineSessionId.start_time | global_time_format}}  </h4>
</div>
</div>
<v-row>
    <v-spacer></v-spacer>
    <v-btn @click="selectShift" color="primary">close shift</v-btn>
    </v-row>
<!--     
    <v-data-table
      :headers="runningPartNoHeader"
      :items="$store.state.runned.MACHINE_RUNNED_MAIN"
      :search="search"
    ></v-data-table> -->
 {{$store.state.runned.MACHINE_RUNNED_MAIN}}
    <v-data-table
      :headers="headerRunningMain"
      :items="$store.state.runned.MACHINE_RUNNED_MAIN"
      :search="search"
    >
     <template v-slot:item.machine_date="{ item }">
    <span>{{ item.machine_date | global_date_format }}</span>
 </template>
 <template v-slot:item.machine_time="{ item }">
    <span>{{ item.machine_time | global_time_format }}</span>
 </template>
 

    </v-data-table>
<h4 style="text-align:center">RUNNING  STATUS OF MACHINE</h4>
    <v-data-table
      :headers="headerRunningMain"
      :items="$store.state.running.MACHINE_RUNNING_MAIN"
      :search="search"
    >
     <template v-slot:item.machine_date="{ item }">
    <span>{{ item.machine_date | global_date_format }}</span>
 </template>
 <template v-slot:item.machine_time="{ item }">
    <span>{{ item.machine_time | global_time_format }}</span>
 </template>
 

    </v-data-table>
<h4 style="text-align:center">MACHINE RUNNING PRODUCTS</h4>
    <v-data-table
      :headers="headerRunningPartNo"
      :items="$store.state.running.MACHINE_RUNNING_PART_NO"
      :search="search"
    >
     <template v-slot:item.machine_date="{ item }">
    <span>{{ item.machine_date | global_date_format }}</span>
 </template>
 <template v-slot:item.machine_time="{ item }">
    <span>{{ item.machine_time | global_time_format }}</span>
 </template>
 

    </v-data-table>
    <h4 style="text-align:center">MACHINE ACTIVITY</h4>
    <v-data-table
      :headers="headerRunningActivity"
      :items="$store.state.running.MACHINE_RUNNING_ACTIVITY"
      :search="search"
    >
 <template v-slot:item.machine_date="{ item }">
    <span>{{ item.machine_date | global_date_format }}</span>
 </template>
 <template v-slot:item.machine_time="{ item }">
    <span>{{ item.machine_time | global_time_format }}</span>
 </template>
 


    </v-data-table>





            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import moment from 'moment';
/* eslint-disable*/
import * as utils from '../core/utils.js'
export default {
data(){
    return{
       search:'',
headerRunningMain:[
        { text: 'MACHINE ID', value: 'machine_id' },
        { text: 'MACHINE CLIENT ID', value: 'machine_client_id' },
        { text: 'MACHINE DATE', value: 'machine_date' },
        { text: 'MACHINE TIME', value: 'machine_time' },
        { text: 'IS CLOSED', value: 'is_closed' },

],
headerRunningPartNo:[
        { text: 'Machine Id', value: 'machine_id' },
        { text: 'PRODUCT NAME', value: 'product_name' },
        { text: 'MATERIAL CODE', value: 'material_code' },
        { text: 'PART NO', value: 'part_no' },
        { text: 'TOTAL COUNT', value: 'total_count' },
        { text: 'GOOD COUNT', value: 'good_count' },
        { text: 'REJECT COUNT', value: 'reject_count' },
        { text: 'IDEAL CYCLE', value: 'ideal_cyle' },
],
headerRunningActivity:[
        { text: 'PRODUCT NAME', value: 'product_name' },
        { text: 'SHIFT', value: 'shift_name' },
        { text: 'Machine Id', value: 'machine_id' },
        { text: 'MACHINE NAME', value: 'machine_name' },
        { text: 'BREAK TYPE', value: 'break_type' },
        { text: 'BREAK REASON', value: 'break_reason' },
        { text: 'STROKE', value: 'stroke' },
        { text: 'MACHINE STATUS', value: 'machine_active_status' },
        { text: 'MACHINE DATE', value: 'machine_date' },
        { text: 'MACHINE TIME', value: 'machine_time' },
 ],
       runningPartNoHeader:[
        { text: 'Machine Id', value: 'machine_id' },
        { text: 'PRODUCT NAME', value: 'product_name' },
        { text: 'MATERIAL CODE', value: 'material_code' },
        { text: 'PART NO', value: 'part_no' },
        { text: 'TOTAL COUNT', value: 'total_count' },
        { text: 'GOOD COUNT', value: 'good_count' },
        { text: 'REJECT COUNT', value: 'reject_count' },
        { text: 'IDEAL CYCLE', value: 'ideal_cyle' },
       ],
       headers:[ 
        { text: 'Machine Id', value: 'machine_id' },
        { text: 'machine Date', value: 'machine_date' },
        { text: 'Machine Time', value: 'machine_time' },
        { text: 'is Closed', value: 'is_closed' },
             ],
machineStatusResult:[],
date:{
to_date:moment().format(this.$store.state.setup.bgDateFormat),
from_date:moment().format(this.$store.state.setup.bgDateFormat)
}
    }
},    
methods:{
selectShift(){
 var $vm=this;
utils.selected_runned_part_no($vm,
$vm.$store.state.running.MACHINE_RUNNING_MAIN,
$vm.$store.state.running.MACHINE_RUNNING_PART_NO,
$vm.$store.state.running.MACHINE_RUNNING_ACTIVITY
)

},
async    submit(){
        var $vm=this;
// var machine_id=$vm.$store.state.setup.selected_machine.id;
var result=await $vm.$store.dispatch("GET_MACHINE_STATUS_BY_DATE",{machine_id,...$vm.date})
$vm.machineStatusResult=result.data.data;


},
    selected_date(date){
var $vm=this;

$vm.date=date;
console.log("selected date",date)

    }
},
    mounted(){
var $vm=this;

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