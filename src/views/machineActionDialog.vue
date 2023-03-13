<template>
    <div>
        <v-dialog v-model="$store.state.dialog.machineActionDialog" fullscreen hide-overlay transition="dialog-bottom-transition" persistent>
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="$store.commit('setDialog',{key:'machineActionDialog',value:false})">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Demo Machine</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items> </v-toolbar-items>
                </v-toolbar>
                <div style="padding: 10px;">

<div style="display:flex;">
<div style="width:65%">
<h4>Shedulers</h4>
<div class="shedulerList">
  <div @click="machineAction('start_shedule',item)" v-for="(item,index) in $store.state.db.shedule" :key="'shedule'+index" >{{item.name}}</div>
</div>
<!-- {{$store.state.machineData.machineHisotry}} -->
<!-- <h4>Breaks</h4>
<div class="breakList">
    <div @click="machine_action('mark_break',item)" v-for="(item,index) in $store.state.db.breaks" :key="'break'+index">{{item.name}}</div>
</div> -->
</div>
<!-- {{$store.state.db.breaks}} -->
<div style="width:25%;position:relative">

<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center">
<h2 style="color:green">Running</h2>


<wave></wave>
</div>
<div style="position:absolute;bottom:0;display:flex;;width:100%">
<div style="display:flex;justify-content:space-between;width:100%;padding:2px">
<span>Login:8:Am </span>
<span>Duration: 4hrs</span>
    </div>
</div>
</div>
<div style="width:10%">
    <div class="machineOperation" style="display:flex;flex-direction:column;height:100%">
    <div @click="machineAction('start')" class="opContainer" style="background:green;color:white">
      <span class="start alcenter">  start</span>
        </div>
    <div @click="machineAction('stop')" class="opContainer" style="background:red;color:white">
      <span class="stop alcenter">  stop</span>
        </div>
</div>

</div>
</div>

<div class="machinePanel" style="display:flex">
    <div style="width:65%;border-right:2px solid white">
<h2> Machine Logs Panel</h2>
<hr>
<div class="machineLogPanel">

<table style="width:100%">
    <thead>
        <tr>
            <td>Activity</td>
            <td>Start Time</td>
            <td>End Time</td>
            <td>Machine Status</td>
            <td>Duration</td>
        </tr>
    </thead>
    <tbody>
        
        <tr @click="selectEditRow(item)"  v-for="(item,index) in $store.state.machineData.machineHisotry" :key="'machineHistory'+index">
          <th>{{item.operation}}</th>
          <th>{{guiTimeFormat(item.start_time)}}</th>
          <th>{{guiTimeFormat(item.end_time)}}</th>
           <th>{{item.machine_status}}</th>
           <th>{{item.duration}}</th>
       </tr>
    </tbody>
</table>

</div>

    </div>

    <div style="width:35%">
<h2 style="text-align:center">Machine Current Activity Panel</h2>
<hr>
<div class="machineCurrentStatus">
Type : {{$store.state.machineData.currentHistory.operation}} <br>
Start Time :{{$store.state.machineData.currentHistory.start_time}}<br>
End Time :...Running<br>
</div>

    </div>
</div>



Mode :Demo<br>
Machine status : {{$store.state.setup.checkMachine}}<br>
Embeded status : {{$store.state.setup.checkEmbededDevice}}<br>
Shift Name : {{$store.state.setup.shiftName}}<br>
machine live data :<pre>{{$store.state.setup.machineLiveData}}</pre><br>
<div v-for="(item,index) in shedule" :key="'ss'+index">

<v-btn @click="SheduleOperation(item,'start')">start</v-btn>
{{item.name}}
<v-btn @click="SheduleOperation(item,'stop')">stop</v-btn>
</div>


<table>

    <tr>
        <td>
            <h1>Manual</h1>
            <h2>Machine Overall</h2>
            <!-- <v-btn @click="machineAction('manual','overallStart')">Start Machine</v-btn>
            <v-btn @click="machineAction('manual','overallStop')">Stop Machine</v-btn> -->

            <h2>Machine Action</h2>
            <v-btn @click="machineAction('manual','start')">Start Machine</v-btn>
            <v-btn  @click="machineAction('manual','stop')">Stop Machine</v-btn>


        </td>
        <td>

            <h1>Automate</h1>
            <h2>Machine Action</h2>
            <v-btn @click="machineAction('automatic','start')">Start Machine</v-btn>
            <v-btn  @click="machineAction('automatic','stop')">Stop Machine</v-btn>



        </td>
    </tr>
</table>

<history></history>


                </div>
            </v-card>
        </v-dialog>


       <v-dialog v-model="editRowDialog" fullscreen hide-overlay transition="dialog-bottom-transition" persistent>
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="editRowDialog=false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Edit Row</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items> </v-toolbar-items>
                </v-toolbar>
                <div style="padding: 10px;">
<!-- {{editRowItem}} -->

<div v-if="editRowItem">

<div v-if="editRowItem.operation=='signal'&&editRowItem.machine_status=='stopped'">
<h4>Breaks</h4>
<div class="breakList">
    <div @click="machineAction('mark_break',{...item,id:editRowItem.id})" v-for="(item,index) in $store.state.db.breaks" :key="'break'+index">{{item.name}}</div>
</div>
<h4>Downtime</h4>
<div class="breakList">
    <div @click="machineAction('mark_downtime',{...item,id:editRowItem.id})" v-for="(item,index) in $store.state.db.down_time" :key="'down_time'+index">{{item.name}}</div>
</div>
</div>


</div>

                </div>
            </v-card>
        </v-dialog>


    </div>
</template>
<script>
import * as machine from '../core/machine.js'

export default {
data(){
    return{
editRowDialog:false,
editRowItem:{},
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

    }
},    

methods:{
selectEditRow(value){
let $vm=this;
$vm.editRowDialog=true;
$vm.editRowItem=value;
},

 SheduleOperation(item,action){
if(action=='start') machine.startMachineShedule(item);
if(action=='stop') machine.stopMachineShedule(item);
    },
    machineAction(action,item){
    var $vm=this;
    switch (action) {
        case "start":
    if(machine.machineLogIn($vm))
        $vm.$alert("Manually started...");
    else
        $vm.$alert("Machine Already Running...");
        break;
    case "stop":
    if(machine.machineLogOut($vm))
        $vm.$alert("Manually Logged out...");
    else
        $vm.$alert("Machine Loged Out...");    
            break;
    case "start_shedule":
    machine.startMachineShedule(item)
            break;
    case "mark_break":
    machine.markBreak(item)
            break;
    case "mark_downtime":
    machine.markDownTime(item)
            break;


    default:
            break;
    }
    // switch (action) {
    //     case "start":
    // machine.startSignal($vm)        
    //         break;
    //     case "stop":
    // machine.stopSignal($vm)        
    //         break;
    //     default:
    //         break;
    // }





    }
}

}
</script>
<style lang="scss">
.shedulerList{
    position:relative;
        min-height: 250px;
    overflow: auto;

}
.shedulerList div{

background:blueviolet;
color:white;
padding:10px;
margin-top:2px;

}
.breakList div{
background:rgb(235, 164, 33);
color:white;
padding:10px;
margin-top:2px;

}
.machineLogPanel{
    max-height: 51vh;
    overflow: auto;
}
.machinePanel{
    background: black;
    color:white;
    min-height:450px;
    margin-top:10px;
}
.machineCurrentStatus{


}

.machineOperation{
    position:relative;
    display:flex;flex-direction:column;
}
.machineOperation div{
    width:100%;
    height:100%;
}
.machineOperation .start{
  background: green;
}
.machineOperation .stop{
  background: red;

}

.alcenter{
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
}
.opContainer{
    position: relative;
    width: 100%;
    height: 100%;
    background: red;
}
</style>