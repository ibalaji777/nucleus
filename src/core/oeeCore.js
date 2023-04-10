import state from "../store/state.js";
import _ from "lodash";
import moment from "moment";

function globalScToMin(value) {
 if (value == "") return 0;
 const duration = moment.duration(value, "seconds");
 const minutes = duration.asMinutes();
 return minutes;
}

function global_availibilty(plannedTimeMin, runTimeMin) {
 return ((runTimeMin / plannedTimeMin) * 100 || 0).toFixed(2);
}

function global_performance(actualProductionCount, theoretical) {
 return ((actualProductionCount / theoretical) * 100 || 0).toFixed(2);
}

function global_quality(goodProduct, actualProductionCount) {
 return ((goodProduct / actualProductionCount) * 100 || 0).toFixed(2);
}

function global_oee(availability, performance, quality) {
 let availability_ = availability / 100;
 let performance_ = performance / 100;
 let quality_ = quality / 100;
 return availability_ * performance_ * quality_ * 100;
}

function machineDataForOee(machineHistory, machineLog) {
 // Availability
 let runTimeMin = globalScToMin(
  _.sumBy(
   _.filter(
    machineHistory,
    (x) => x.machine_status == state.defaultData.machine_status_on
   ),
   (x) => parseFloat(x.duration || 0)
  )
 );
 let plannedTimeMin = globalScToMin(
  _.sumBy(
   _.filter(
    machineHistory,
    (x) => x.operation != state.defaultData.operation_break
   ),
   (x) => parseFloat(x.duration || 0)
  )
 );
 console.log("plannedTimeMin", plannedTimeMin);
 let availability = global_availibilty(plannedTimeMin, runTimeMin);

 // Performance
 let actualProductionCount = parseFloat(machineLog.actual_count || 0);
 let plannedStroke = parseFloat(machineLog.actual_stroke || 1);
 let pieces = parseFloat(machineLog.pieces_per_stroke || 1);
 let theoretical = plannedStroke * pieces;
 let performance = global_performance(actualProductionCount, theoretical);
 // Quality
 let quality = global_quality(
  actualProductionCount - parseFloat(machineLog.rejected_count || 0),
  actualProductionCount
 );

 // OEE
 let oee = global_oee(availability, performance, quality);

 return {
  availability: parseFloat(availability || 0).toFixed(2),
  performance: parseFloat(performance || 0).toFixed(2),
  quality: parseFloat(quality || 0).toFixed(2),
  oee: parseFloat(oee || 0).toFixed(2),
 };
}

export { machineDataForOee };

//-----------------------------formula using-------------------

// export function availability(plannedTimeMin,runTimeMin){
// //plannedTime without break (machine planned active state)
// //runTime machine runned time only exept downtime and breaks
//     return parseFloat(parseFloat(runTimeMin)/parseFloat(plannedTimeMin)*100);
// }

// export function performance(runTimeMin,piaceForMinute,actualProductionCount)
// {

// let theoretical=parseFloat(runTimeMin)*parseFloat(piaceForMinute);

// return parseFloat(actualProductionCount)/parseFloat(theoretical)*100;

// }

// export function quality(goodProduct,actualProductionCount){

// return parseFloat(goodProduct)/parseFloat(actualProductionCount)*100;

// }
