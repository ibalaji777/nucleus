import _ from 'lodash'
export function validation(action,value){

    if(action=='time'){
    var reg=/\d{2}:\d{2}\s(?:AM|PM|am|pm)/
    return reg.test(value)
    }

    if(action=='string'){
        if(value!='') return true;
    }
    
    return false;
}

export function selected_runned_part_no($vm,MACHINE_RUNNED_MAIN,MACHINE_RUNNED_PART_NO,MACHINE_RUNNED_ACTIVITY){
    $vm.$store.commit('setDialog',{key:'closeShiftDialog',value:true})
    // $vm.$store.commit('selected_runned_part_no',_.cloneDeep(runnedPartNoArray))
    // $vm.$store.commit('selected_machine_runned_main',_.cloneDeep(selected_machine_runned_main))
    $vm.$store.commit('runned',
    {
        MACHINE_RUNNED_MAIN:_.cloneDeep(MACHINE_RUNNED_MAIN),
        MACHINE_RUNNED_PART_NO:_.cloneDeep(MACHINE_RUNNED_PART_NO),
        MACHINE_RUNNED_ACTIVITY:_.cloneDeep(MACHINE_RUNNED_ACTIVITY)
    
    })
}


export function getRunningMachineData($vm){
$vm.$store.dispatch('GET_MACHINE_RUNNING_PART_NO')
$vm.$store.dispatch('GET_MACHINE_RUNNING_MAIN')
$vm.$store.dispatch('GET_MACHINE_RUNNING_ACTIVITY')

}