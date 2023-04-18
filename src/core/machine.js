/*eslint-disable*/

import store from "./../store/index.js";
var moment = require("moment");

export function generateUq() {
 store.commit("setGenerateUid");
}

export function machineLogIn($vm) {
 store.commit("machineWatcher", true);
 if (store.state.setup.checkMachine) return false;
 var dataset = machineData();
 dataset.operation = "force";
 dataset.type = "manual";
 dataset.action = "start";
 dataset.reason = "planned";
 dataset.message = "login";
 store.dispatch("WATCH_MACHINE", dataset);
 return true;
}

export function machineLogOut($vm) {
 return new Promise((resolve, reject) => {
  var dataset = machineData();
  dataset.operation = "force";
  dataset.type = "manual";
  dataset.action = "stop";
  dataset.reason = "planned";
  dataset.message = "logout";

  dataset.uq = _.cloneDeep(store.state.setup.uq);

  dataset.quality = $vm.global_quality;
  dataset.performance = $vm.global_performance;
  dataset.availability = $vm.global_availibilty;
  dataset.oee = $vm.global_oee;

  store.commit("machineWatcher", false);
  store.dispatch("WATCH_MACHINE", dataset);

  setTimeout(() => {
   $vm.$store
    .dispatch("saveDataToServer")
    .then((res) => {
     resolve(res);
     generateUq();
     store.commit("CLEAR_MACHINE_DATA");
    })
    .catch(() => {
     reject();
     //  generateUq();
     //  store.commit("CLEAR_MACHINE_DATA");
    });
  }, 400);
 });
}

export function startSignal(checkMachine) {
 var dataset = machineData();
 dataset.operation = "signal";
 dataset.message = checkMachine ? "running" : "stopped";
 dataset.type = "automatic";
 //  dataset.reason = checkMachine ? "" : "unplanned";
 dataset.action = checkMachine ? "start" : "stop";
 store.dispatch("WATCH_MACHINE", dataset);
}

export function startMachineShedule(item) {
 if (store.state.setup.checkMachine) return false;
 var dataset = machineData();
 dataset.operation = "shedule";
 dataset.op_id = item.id;
 dataset.op_name = item.name;
 dataset.op_desc = item.desc;
 dataset.message = "shedule_started";
 dataset.reason = item.name;
 dataset.type = "manual";
 dataset.action = "start";
 store.dispatch("deviceAlert", "off");
 store.dispatch("WATCH_MACHINE", dataset);
 return true;
}

export function markBreak(selected, index, item) {
 var dataset = {}; //machineData();
 dataset.id = item.id; //history id
 dataset.operation = "break";
 dataset.op_id = item.id;
 dataset.op_name = item.name;
 dataset.op_desc = item.desc;
 dataset.message = "break";
 dataset.reason = item.name;
 dataset.type = "manual";
 dataset.action = "stop";

 //  console.log(dataset);
 store.dispatch("deviceAlert", "off");
 //  store.dispatch("MARK_DOWNTIME", dataset);
 store.commit("MARK_BREAK", { index, dataset });

 return true;
}

//note its need to update
export function markDownTime(selected, index, item) {
 console.log("downtime marker", selected, item);
 var dataset = {};
 dataset.operation = "force";
 dataset.op_id = item.id;
 dataset.op_name = item.name;
 dataset.op_desc = item.desc;
 dataset.message = "downtime";
 dataset.reason = item.name;
 dataset.type = "manual";
 dataset.action = "stop";
 store.dispatch("deviceAlert", "off");
 //  store.dispatch("MARK_DOWNTIME", dataset);
 store.commit("MARK_DOWNTIME", { index, dataset });
 return true;
}

export function markOeeInfo(item) {
 var dataset = {
  uq: store.state.setup.uq,
  machine_id: store.state.setup.selected_machine.id,
  actual_count: item.actual_count,
  rejected_count: item.rejected_count,
  pieces_per_stroke: item.pieces_per_stroke,
  emp_remarks: item.emp_remarks,
 };
 store.commit("MACHINE_LOG_UPDATE", dataset);
}

export function machineEventTermination() {
 //1.shift change termination
 //2.product change termination
 //  machineLogOut();
}

export function machineRunningStatus($vm) {}

export function machineWatch($vm) {
 //machine logout when product change and shift change
}

export function listentShift() {
 setInterval(() => {
  // console.log("listen shift");
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
   store.commit("setShift", currentShift[0]);
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
  // console.log(machineData);
  store.commit("machineLiveData", machineData);
 }, 1000);
}

export function feedDataToServer(data) {
 return new Promise((resolve, reject) => {
  store
   .dispatch("feedDataToServer", data)
   .then((res) => {
    resolve(res);
   })
   .catch(() => {
    reject();
   });
 });
}

export function listenMachineReal() {}

export function machineData() {
 if (!store.state.setup.checkMachine) store.dispatch("deviceAlert", "on");
 else store.dispatch("deviceAlert", "off");
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
  ruq: moment().format(),

  time: new Date(),
  product_id: store.state.setup.selected_product.id,
  machine_id: store.state.setup.selected_machine.id,
  emp_id: store.state.setup.selected_employee.id,
  shift: store.state.setup.selected_shift.name,

  shift_start_time: store.state.setup.selected_shift.start_time,
  shift_end_time: store.state.setup.selected_shift.end_time,

  type: "", //manual or automatic
  action: "", //start or stop

  reason: "", //message

  machine_status: store.state.setup.checkMachine
   ? store.state.defaultData.machine_status_on
   : store.state.defaultData.machine_status_off, //start or stop

  //new-------
  operation: "", //signal or shedule or  break

  start_stroke: _.cloneDeep(store.state.setup.machineLiveData.stroke),
  end_stroke: null,
  actual_stroke: null,
  pieces_per_stroke: 1,
  //new
  message: store.state.setup.checkMachine
   ? "Machine Running"
   : "Machine Stopped", //start or stop,
  // shedule_id:0,
  // shedule_pmin:0,
  remarks: "",
 };
}
