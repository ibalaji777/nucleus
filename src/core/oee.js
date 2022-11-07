




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

console.log("plannedProductionTime",plannedProductionTime)
console.log("runTime",runTime)
console.log("goodCount",goodCount)


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
console.log("performance",performance,)//ok
console.log("quality",quality)//ok
console.log("availability",availability)//ok
console.log("OEE",oee)//ok

console.log("performanceToHundered",performanceToHundered,)//ok
console.log("qualityToHundered",qualityToHundered)//ok
console.log("availibiltyToHundered",availibiltyToHundered)//ok
console.log("oeeToHundered",oeeToHundered)//ok


}