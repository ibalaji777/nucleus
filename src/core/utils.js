import _ from "lodash";
var moment = require("moment");
export function validation(action, value) {
 if (action == "time") {
  var reg = /\d{2}:\d{2}\s(?:AM|PM|am|pm)/;
  return reg.test(value);
 }

 if (action == "string") {
  if (value != "") return true;
 }

 return false;
}

export function selected_runned_part_no(
 $vm,
 MACHINE_RUNNED_MAIN,
 MACHINE_RUNNED_PART_NO,
 MACHINE_RUNNED_ACTIVITY
) {
 $vm.$store.commit("setDialog", { key: "closeShiftDialog", value: true });
 // $vm.$store.commit('selected_runned_part_no',_.cloneDeep(runnedPartNoArray))
 // $vm.$store.commit('selected_machine_runned_main',_.cloneDeep(selected_machine_runned_main))
 $vm.$store.commit("runned", {
  MACHINE_RUNNED_MAIN: _.cloneDeep(MACHINE_RUNNED_MAIN),
  MACHINE_RUNNED_PART_NO: _.cloneDeep(MACHINE_RUNNED_PART_NO),
  MACHINE_RUNNED_ACTIVITY: _.cloneDeep(MACHINE_RUNNED_ACTIVITY),
 });
}

export function getRunningMachineData($vm) {
 $vm.$store.dispatch("GET_MACHINE_RUNNING_PART_NO");
 $vm.$store.dispatch("GET_MACHINE_RUNNING_MAIN");
 $vm.$store.dispatch("GET_MACHINE_RUNNING_ACTIVITY");
}

// export function chartTimeStatus($vm){
//     var machineActivities=$vm.$store.state.setup.machineActivities;
//     var sortmachineActivities=_.orderBy(machineActivities, ['machine_date_time'], ['asc']);
//     var datasets = _.map(machineActivities,(x)=>{

//         return {
//             label: "T1",
//             data: [{
//               x: moment(x.machine_date_time).add(0,'hours'),
//               y: 0,
//               label:x.break_type,
//              count:x.stroke

//             }],
//             backgroundColor: x.machine_active_status=='OFF'?'red':'green'
//           }
//      })
//     if(1<sortmachineActivities.length){
//     var todayStartTime=moment(sortmachineActivities[0]['machine_date_time'])
//     var todayEndTime=moment(sortmachineActivities[sortmachineActivities.length-1]['machine_date_time'])
// //--------------------------format----------------------

//     // {
//     //     label: "T1" + moment(todayStartTime).add(0.5, 'hours'),
//     //     data: [{
//     //       x: moment(todayStartTime).add(0.5, 'hours'),
//     //       y: 0,
//     //           label:'a1',
//     //   count:3

//     //     }],
//     //     backgroundColor: "red"
//     //   },

// return {
//     todayStartTime,
//     todayEndTime,
//     datasets

// }
// }
// return {
//     todayStartTime:moment(),
//     todayEndTime:moment().add(8),
//     datasets

// }
//     }

export function chartTimeStatus($vm) {
 var machineActivities = $vm.$store.state.machineData.machineHisotry;
 var machineLog = $vm.$store.state.machineData.machineLog;
 var sortmachineActivities = _.orderBy(
  machineActivities,
  ["start_time"],
  ["asc"]
 );
 var datasets = _.map(machineActivities, (x) => {
  return {
   label: "T1",
   data: [
    {
     x: moment(x.start_time).add(0, "hours"),
     y: 0,
     label: x.operation,
     count: x.stroke,
    },
   ],
   backgroundColor: x.machine_active_status == "stopped" ? "red" : "green",
  };
 });
 if (1 < sortmachineActivities.length) {
  var todayStartTime = moment(machineLog["start_time"]);
  var todayEndTime = moment(machineLog["end_time"]); //moment(sortmachineActivities[sortmachineActivities.length-1]['machine_date_time'])
  //--------------------------format----------------------

  // {
  //     label: "T1" + moment(todayStartTime).add(0.5, 'hours'),
  //     data: [{
  //       x: moment(todayStartTime).add(0.5, 'hours'),
  //       y: 0,
  //           label:'a1',
  //   count:3

  //     }],
  //     backgroundColor: "red"
  //   },

  return {
   todayStartTime,
   todayEndTime,
   datasets,
  };
 }
 return {
  todayStartTime: moment(),
  todayEndTime: moment().add(8),
  datasets,
 };
}
