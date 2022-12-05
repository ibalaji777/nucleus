
/*eslint-disable*/
import _ from 'lodash'
import moment from 'moment'

export function Availability(runTime,plannedProductionTime){

    return (parseFloat(runTime||0) / parseFloat(plannedProductionTime||0)).toFixed(4)
}


export function  Performance(idealCycleTime,totalCount,runTime){

return    ((parseFloat(idealCycleTime||0) * parseFloat(totalCount||0))/(parseFloat(runTime||0)*60)).toFixed(4)
}

export function Quality(goodCount,totalCount){

    return (parseFloat(goodCount||0) / parseFloat(totalCount||0)).toFixed(4)
}


export function OEE(runTime,plannedProductionTime,idealCycleTime,totalCount,goodCount){
 return (parseFloat(Availability(runTime,plannedProductionTime)||0)*parseFloat(Performance(idealCycleTime,totalCount,runTime)||0)*parseFloat(Quality(goodCount,totalCount)||0)).toFixed(4)
}

export function RunTime(plannedProductionTime,stopTime){
   return  parseFloat(plannedProductionTime||0) - parseFloat(stopTime||0)
}

export function PlannedProductionTime(shiftLength,downTime){
return (parseFloat(shiftLength||0)-parseFloat(downTime||0)).toFixed(4)
 }

 export function GoodCount(totalCount,rejectCount)
{
    return (parseFloat(totalCount||0)-parseFloat(rejectCount||0)).toFixed(4)
}

export function HourToMin(hour){
    return parseFloat(hour||0)*60;
}
export function calculation(){
var shiftLength=HourToMin(8);//minutes
var breakTime=60;//minutes
var downTime=47//minutes
var idealCycleTime=1;//seconds
var totalCount=19271;
var rejectCount=423;
//***********formula preparation*********** */
var plannedProductionTime=PlannedProductionTime(shiftLength,breakTime)//ok
var runTime=RunTime(plannedProductionTime,downTime)//ok
var goodCount=GoodCount(totalCount,rejectCount)//ok

// console.log("plannedProductionTime",plannedProductionTime)
// console.log("runTime",runTime)
// console.log("goodCount",goodCount)


//***********OEE Calculation*********** */
var performance=Performance(idealCycleTime,totalCount,runTime)
var quality=Quality(goodCount,totalCount)
var availability=Availability(runTime,plannedProductionTime)
var oee=availability*performance*quality
//***********OEE Results*********** */
var performanceToHundered=performance*100;
var qualityToHundered=quality*100;
var availibiltyToHundered=availability*100;
var oeeToHundered=oee*100;
// console.log("performance",performance,)//ok
// console.log("quality",quality)//ok
// console.log("availability",availability)//ok
// console.log("OEE",oee)//ok

// console.log("performanceToHundered",performanceToHundered,)//ok
// console.log("qualityToHundered",qualityToHundered)//ok
// console.log("availibiltyToHundered",availibiltyToHundered)//ok
// console.log("oeeToHundered",oeeToHundered)//ok


}
//local data set
function _breaks($vm){
    return _.reduce($vm.$store.state.db.breaks, function(result, x) {
        return result+parseFloat(moment.utc(moment(x.end_time, "HH:mm").diff(moment(x.start_time, "HH:mm"))).format("mm"));
      }, 0)
}
function _downTime($vm){

    return $vm.globalDownTime.takenTime||0;
}

// function _idealCycleTime($vm){

// }

function findNextOnStatus(i,sortmachineActivities){
var next=i+1;
var objectNext=sortmachineActivities[next];
if(typeof objectNext!='undefined'&&objectNext.machine_active_status=='ON')
{
  return objectNext;
}
if(next!=sortmachineActivities.length)
findNextOnStatus(next,sortmachineActivities)

return undefined;
}
 
function _downTimeN($vm,sortmachineActivities){
    var downTimes=[]
    for(var i=0;i<sortmachineActivities.length;i++){
     var object=sortmachineActivities[i];
     if(object.break_type=='UNPLANNED'&&object.machine_active_status=='OFF')
     {  var objectNext=findNextOnStatus(i,sortmachineActivities);
        if(typeof objectNext!='undefined')
               downTimes.push({...object,start_time:object.machine_date_time,end_time:objectNext.machine_date_time})
     }
    }
    var takenTime= _.reduce(downTimes, function(result, x) {
    return parseFloat(result)+parseFloat(moment.utc(moment(x.end_time, "HH:mm").diff(moment(x.start_time, "HH:mm"))).format("mm"));
  }, 0);
    return {
        count:downTimes.length,
        datasets:downTimes,
        takenTime
    }
}
export function oeePreset($vm){
var machineActivities=$vm.$store.state.setup.machineActivities;
var sortmachineActivities=_.orderBy(machineActivities, ['machine_date_time'], ['asc']);

if(1<sortmachineActivities.length){
var start_time=moment(sortmachineActivities[0]['machine_date_time'])
var end_time=moment(sortmachineActivities[sortmachineActivities.length-1]['machine_date_time'])
var duration = moment.duration(end_time.diff(start_time));
var hours = duration.asHours();
var plannedProductionTime=hours;
var breaks=_breaks($vm)
var downtime=_downTimeN($vm,sortmachineActivities);
console.log("check+++",sortmachineActivities)
console.log("plannedProductionTime",plannedProductionTime)
console.log("breaks",breaks,'downtime',downtime.takenTime)
console.log(downtime)
}
}


function oeeData(payload){

console.log("oeeData",payload)

    const {
        shiftLength,
        breakTime,
        downTime,
        totalCount,
        rejectCount,
        idealCycleTime
    }=payload
    // var goodCount=productData.good_count||0;

//***********formula preparation*********** */
var goodCount=GoodCount(totalCount,rejectCount)//ok

// console.log("plannedProductionTime",plannedProductionTime)
// console.log("runTime",runTime)
// console.log("goodCount",goodCount)


//***********OEE Calculation*********** */
var performance=Performance(idealCycleTime,totalCount,runTime)
var quality=Quality(goodCount,totalCount)
// var availability=Availability(runTime,plannedProductionTime)
var oee=availability*performance*quality
//***********OEE Results*********** */
// var performanceToHundered=performance*100;
// var qualityToHundered=quality*100;
// var availibiltyToHundered=availability*100;
// var oeeToHundered=oee*100;
// console.log("oeeData performance",performance,)//ok
// console.log("oeeData quality",quality)//ok
// console.log("oeeData availability",availability)//ok
// console.log("oeeData OEE",oee)//ok
// console.log("oeeData performanceToHundered",performanceToHundered,)//ok
// console.log("oeeData qualityToHundered",qualityToHundered)//ok
// console.log("oeeData availibiltyToHundered",availibiltyToHundered)//ok
// console.log("oeeData oeeToHundered",oeeToHundered)//ok

return {
    performance,
    quality,
    availability,
    oee
}
}
function _idealTime_productionCount($vm){
return _.reduce($vm.$store.state.global.LOCAL_SK_IO_MACHINE_PART_NO,(result,dataset)=>{
    var current=parseFloat(dataset.ideal_cycle||0)*parseFloat(dataset.total_count||0)
    result+=current;
    return result
    },0)
}
function addMultipleQualityIntoSingle($vm){
//  return   _.reduce($vm.$store.state.global.LOCAL_SK_IO_MACHINE_PART_NO,(result,dataset)=>{
//         var productData=dataset.data; 
//         var totalCount=productData.total_count||0;
// var rejectCount=productData.reject_count||0;
// var goodCount=totalCount-rejectCount;

// result.goodCount=goodCount+result.goodCount;
// result.totalCount=totalCount+result.totalCount;

// var current=parseFloat(dataset.ideal_cycle||0)*parseFloat(dataset.total_count||0)
// result+=current;
// return result;
//         },{
//             goodCount:0,
//             totalCount:0
//         })
var goodCount=_.reduce($vm.$store.state.global.LOCAL_SK_IO_MACHINE_PART_NO,(result,dataset)=>{
var productData=dataset.data; 
var totalCount=productData.total_count||0;
var rejectCount=productData.reject_count||0;
var goodCount=totalCount-rejectCount;
result+=parseFloat(goodCount||0);
return result;
    },0)
var totalCount=_.reduce($vm.$store.state.global.LOCAL_SK_IO_MACHINE_PART_NO,(result,dataset)=>{
    var productData=dataset.data; 
    var totalCount=productData.total_count||0;
    result+=parseFloat(totalCount||0);
    return result;
        },0)
// console.log("qt+++=",goodCount,totalCount)
        var result=parseFloat(goodCount)/parseFloat(totalCount)
return isNaN(result)?0:result;
}
export function oeeCalculation($vm){

var shiftLength=HourToMin($vm.$store.state.setup.selected_machine.hours)||0;//minutes
var breakTime=_breaks($vm)||0;//minutes
var downTime=_downTime($vm)||0//minutes

var plannedProductionTime=PlannedProductionTime(shiftLength,breakTime)//ok
var runTime=RunTime(plannedProductionTime,downTime)//ok

var availability=Availability(runTime,plannedProductionTime)
var performance=parseFloat(_idealTime_productionCount($vm)||0)*parseFloat(runTime||0)
var quality=addMultipleQualityIntoSingle($vm)

//may differ based on part no===================
// console.log("=======eecalculation========")
// console.log("availability",availability)
// console.log("performance",performance)
// console.log("quality",quality)

// console.log(_idealTime_productionCount($vm))
// console.log(addMultipleQualityIntoSingle($vm))
// console.log($vm.$store.state.global.LOCAL_SK_IO_MACHINE_PART_NO)



// _.map($vm.$store.state.global.LOCAL_SK_IO_MACHINE_PART_NO,(product)=>{
//    var productData=product.data; 
// //format
// // company_id
// // emp_id
// // good_count
// // ideal_cycle
// // machine_client_id
// // machine_date
// // machine_id
// // machine_time
// // part_no
// // product_id
// // reject_count
// // shift_id
// // total_count
// var idealCycleTime=productData.ideal_cycle||0;//seconds
// var totalCount=productData.total_count||0;
// var rejectCount=productData.reject_count||0;

// console.log("======oee deep======")
// console.log(oeeData({
//     shiftLength,
//     breakTime,
//     downTime,
//     totalCount,
//     rejectCount,
//     idealCycleTime
// }))
// console.log(shiftLength,breakTime,downTime)
// console.log(product)
// })



}