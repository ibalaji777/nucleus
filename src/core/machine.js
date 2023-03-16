/*eslint-disable*/

import store from "./../store/index.js";
var moment = require("moment");

export function generateUq() {
 store.commit("setGenerateUid");
}

export function machineLogIn($vm) {
 if (store.state.setup.checkMachine) return false;
 var dataset = machineData();
 dataset.operation = "force";
 dataset.type = "manual";
 dataset.action = "start";
 dataset.reason = "planned";
 store.dispatch("WATCH_MACHINE", dataset);
 return true;
}

export function machineLogOut($vm) {
 var dataset = machineData();
 dataset.operation = "force";
 dataset.type = "manual";
 dataset.action = "stop";
 dataset.reason = "planned";

 generateUq();
 //  store.dispatch("WATCH_MACHINE", data);
 return true;
}

export function startSignal($vm) {
 var dataset = machineData();
 dataset.operation = "signal";
 dataset.message = "Machine Running";
 dataset.type = "automatic";
 dataset.action = "start";
 store.dispatch("WATCH_MACHINE", dataset);
}

export function startMachineShedule(item) {
 if (store.state.setup.checkMachine) return false;
 var dataset = machineData();
 dataset.operation = "shedule";
 dataset.op_id = item.id;
 dataset.op_name = item.name;
 dataset.op_desc = item.desc;
 dataset.message = "Shedule Started";
 dataset.reason = item.name;
 dataset.type = "manual";
 dataset.action = "start";

 store.dispatch("WATCH_MACHINE", dataset);
 return true;
}

export function markBreak(item) {
 var dataset = machineData();
 dataset.id = item.id; //history id
 dataset.operation = "break";
 dataset.op_id = item.id;
 dataset.op_name = item.name;
 dataset.op_desc = item.desc;
 dataset.message = "Break";
 dataset.reason = item.name;
 dataset.type = "manual";
 dataset.action = "";

 console.log(dataset);
 store.dispatch("MARK_DOWNTIME", dataset);
 return true;
}

//note its need to update
export function markDownTime(item) {
 var dataset = machineData();
 dataset.id = item.id; //history id
 dataset.operation = "downtime";
 dataset.op_id = item.id;
 dataset.op_name = item.name;
 dataset.op_desc = item.desc;
 dataset.message = "Down Time Marked";
 dataset.reason = item.name;
 dataset.type = "manual";
 dataset.action = "";

 store.dispatch("MARK_DOWNTIME", dataset);
 return true;
}

export function markOeeInfo(item) {
 var dataset = {
  uq: store.state.setup.uq,
  machine_id: store.state.setup.selected_machine.id,
  actual_count: item.actual_count,
  rejected_count: item.rejected_count,
  pieces_per_min: item.pieces_per_min,
 };

 store.dispatch("MACHINE_LOG_DATA", dataset);
}

export function machineRunningStatus($vm) {}

export function machineWatch($vm) {
 //machine logout when product change and shift change
}

export function listentShift() {
 setInterval(() => {
  console.log("listen shift");
  store.commit("setTimeEverySecond");
  store.commit("setDate");

  var currentTime = new moment().format("hh:mm");
  var currentShift = _.filter(store.state.db.shifts, (x) => {
   if (x.start_time <= currentTime && x.end_time >= currentTime) return true;
   return false;
  });
  if (
   currentShift.length != 0 &&
   store.state.setup.selected_shift.id != currentShift[0].id
  )
   store.commit("setShiftName", currentShift[0].name);
 }, 1000);
}

export function listenMachineDemo() {
 let machineStatus = false;
 let embededStatus = false;
 let stroke = 0,
  rpm = 0;

 setInterval(() => {
  machineStatus = !machineStatus;
  embededStatus = !embededStatus;
 }, 9000);

 setInterval(() => {
  if (machineStatus && embededStatus) {
   stroke++;
   rpm = Math.floor(Math.random() * 299) + 301;
  }
  //machine in continues mode and signal
  store.commit("setMachineStatus", machineStatus);
  //serial port started read
  store.commit("setEmbededStatus", embededStatus);
  //live data from machine input status(connected with sensor) and machineStatus(on/off in boolean based on input status) are same
  var machineData = {
   stroke,
   rpm,
   machine: machineStatus,
   inputState: machineStatus,
  };
  console.log(machineData);
  store.commit("machineLiveData", machineData);
 }, 1000);
}

export function listenMachineReal() {}

export function machineData() {
 return {
  //force ->first time start
  //force ->Logout time start
  //break and downtime only a marker like a reasoner
  //sheduler list of options
  //signal ->actual machine running/stopped

  operation: "", //signal/shedule/break/downtime/force
  op_id: 0, //signal/shedule/break/downtime/force their id
  op_name: "", //signal/shedule/break/downtime/force their name
  op_desc: "", //signal/shedule/break/downtime/force their desc
  op_min: "", //signal/shedule/break/downtime/force their min

  uq: store.state.setup.uq,

  time: new Date(),
  product_id: store.state.setup.selected_product.id,
  machine_id: store.state.setup.selected_machine.id,
  emp_id: store.state.setup.selected_employee.id,
  shift: "",

  type: "", //manual or automatic
  action: "", //start or stop

  reason: "", //message

  machine_status: store.state.setup.checkMachine
   ? store.state.defaultData.machine_status_on
   : store.state.defaultData.machine_status_off, //start or stop

  //new-------
  operation: "", //signal or shedule or  break

  stroke: store.state.setup.machineLiveData.stroke,
  //new
  message: store.state.setup.checkMachine
   ? "Machine Running"
   : "Machine Stopped", //start or stop,
  // shedule_id:0,
  // shedule_pmin:0,
  remarks: "",
 };
}
