




export function availability(plannedTimeMin,runTimeMin){
//plannedTime without break (machine planned active state)
//runTime machine runned time only exept downtime and breaks
    return parseFloat(parseFloat(runTimeMin)/parseFloat(plannedTimeMin)*100);
}

export function performance(runTimeMin,piaceForMinute,actualProductionCount)
{

let theoretical=parseFloat(runTimeMin)*parseFloat(piaceForMinute);

return parseFloat(actualProductionCount)/parseFloat(theoretical)*100;

}


export function quality(goodProduct,actualProductionCount){

return parseFloat(goodProduct)/parseFloat(actualProductionCount)*100;

}