/*eslint-disable*/

import store from './../store/index.js'
var moment = require("moment");


export function start($vm)
{
if(store.state.setup.checkMachine)  return false;

var dataset= machineData();
dataset.operation="employee",
dataset.type="manual";
dataset.action="start";
dataset.reason="planned";

    

    store.dispatch("WATCH_MACHINE",data)

    return true;
}
 
export  function stop($vm){


var dataset= machineData();
dataset.operation="signal",
dataset.type="automatic";
dataset.action="stop";


}

export  function startSignal($vm){

//machine first time  status marker
var dataset= machineData();
dataset.operation="signal",
dataset.message="Machine Running";
dataset.type="automatic";
dataset.action="start";
store.dispatch("WATCH_MACHINE",data)
}

// export  function stopSignal($vm){
// //machine final time  status marker
// var dataset= machineData();
// dataset.operation="signal",
// dataset.message="Machine Stopped";
// dataset.type="automatic";
// dataset.action="stop";
// store.dispatch("WATCH_MACHINE",data)


// }



//done
export function startMachineShedule(item){

if(store.state.setup.checkMachine)  return false;
    var dataset= machineData();

    dataset.operation="shedule";
    dataset.op_id=item.id;
    dataset.op_name=item.name;
    dataset.op_desc=item.desc;
    dataset.message="Shedule Started";
    dataset.reason=item.name;
    dataset.type="manual";
    dataset.action="start";
    
    store.dispatch("WATCH_MACHINE",data)
    return true;

}

export function markBreak(item){

    if(store.state.setup.checkMachine)  return false;
        var dataset= machineData();
    
        dataset.operation="break";
        dataset.op_id=item.id;
        dataset.op_name=item.name;
        dataset.op_desc=item.desc;
        dataset.message="Break";
        dataset.reason=item.name;
        dataset.type="manual";
        dataset.action="";
        
        // store.dispatch("WATCH_MACHINE",data)
        return true;
    
    }
    

//note its need to update
export function markDownTime(item){

    if(store.state.setup.checkMachine)  return false;
        var dataset= machineData();
    
        dataset.operation="downtime";
        dataset.op_id=item.id;
        dataset.op_name=item.name;
        dataset.op_desc=item.desc;
        dataset.message="Down Time Marked";
        dataset.reason=item.name;
        dataset.type="manual";
        dataset.action="";
        
        // store.dispatch("WATCH_MACHINE",data)
        return true;
    
    }
    

// export function stopMachineShedule(item){

// if(store.state.setup.checkMachine)  return false;

//     var dataset= machineData();
//     dataset.operation="shedule",
//     dataset.message="shedule stopped";
//     dataset.shedule_id=item.id;
//     dataset.reason=item.name;
//     dataset.shedule_pmin=item.minutes;
//     dataset.type="manual";
//     dataset.action="stop";
    
//     store.dispatch("WATCH_MACHINE",data)
//     return true;

    
// }


export function startBreak(item){
//done
    if(store.state.setup.checkMachine)  return false;
    
        var dataset= machineData();

        dataset.operation="break"
        dataset.op_id=item.id
        dataset.op_name=item.name
        dataset.op_desc=item.desc
        dataset.message="Break Started";
        dataset.type="manual";
        dataset.action="start";
        
        store.dispatch("WATCH_MACHINE",data)
        return true;
    
    }
    
    // export function stopBreak(item){
    
    // if(store.state.setup.checkMachine)  return false;
    
    // var dataset= machineData();
    // dataset.operation="break",
    // dataset.message="break stopped";
    // dataset.type=item.type;//manual/automatic
    // dataset.action="stop";
    
    //     store.dispatch("WATCH_MACHINE",data)
    //     return true;
    
        
    // }
    


export  function machineRunningStatus($vm){




}

export function machineWatch ($vm){


//machine logout when product change and shift change



}

export function listenBreak(){


    
}

export function listentShift(){
    setInterval(() => {
    console.log("listen shift");
    store.commit("setTimeEverySecond");
    store.commit("setDate");
 
    var currentTime = new moment().format("hh:mm");
    var currentShift = _.filter(store.state.db.shifts, (x) => {
      if (x.start_time <= currentTime && x.end_time >= currentTime) return true;
         return false;});
     if (
         currentShift.length != 0 &&store.state.setup.selected_shift.id != currentShift[0].id
        )
         store.commit("setShiftName", currentShift[0].name);
       }, 1000);
  
}


export function listenMachineDemo(){
    let machineStatus=false;
    let embededStatus=false;
    let stroke=0,rpm= 0;

setInterval(()=>{
        machineStatus=!machineStatus;
        embededStatus=!embededStatus;
       },9000);

    setInterval(()=>{

  if(machineStatus&&embededStatus) {
        stroke++;
        rpm=Math.floor(Math.random() * 299) + 301;
    }
    //machine in continues mode and signal
    store.commit('setMachineStatus',machineStatus);
    //serial port started read
    store.commit('setEmbededStatus',embededStatus);
    //live data from machine input status(connected with sensor) and machineStatus(on/off in boolean based on input status) are same
    var machineData={stroke,rpm,machine:machineStatus,inputState:machineStatus};
    console.log(machineData);
    store.commit('machineLiveData',machineData);
    },1000)
 
}


export function listenMachineReal(){


   
}








export function machineData(){

return {

    operation:'',
    op_id:0,
    op_name:'',
    op_desc:'',
    op_min:'',
    
    uq:"11",

    time:new Date(),
    product_id:store.state.setup.selected_product.id,
    machine_id:store.state.setup.selected_machine.id,
    emp_id:store.state.setup.selected_employee.id,
    shift:"",

    type:'',//manual or automatic
    action:'', //start or stop
    
    reason:'',//message
    

    machine_status:store.state.setup.checkMachine ? "running": "stopped",//start or stop
     
    //new-------
    operation:'',//signal or shedule or  break

    stroke:store.state.setup.machineLiveData.stroke,
    //new
    message:store.state.setup.checkMachine ? "Machine Running": "Machine Stopped",//start or stop,
    // shedule_id:0,
    // shedule_pmin:0,
    remarks:''
}

}