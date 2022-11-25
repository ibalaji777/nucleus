var moment = require('moment')
import _ from 'lodash'
var liveMachine = [];
export function tracker($vm,callback) {
    //ok
    var company={
        company_id:$vm.$store.state.setup.selected_company.id
    }
    //ok
    var shift = {
        shift_id: $vm.$store.state.setup.selected_shift.id,
        shift_name: $vm.$store.state.setup.selected_shift.name,
    }
    //ok
    var selected_product = {
        product_id: $vm.$store.state.setup.selected_product.id,
        product_name: $vm.$store.state.setup.selected_product.name,
        part_no: $vm.$store.state.setup.selected_product.part_no,
        material_code: $vm.$store.state.setup.selected_product.material_code,

    }
    //ok
    var selected_employee = {
        emp_id: $vm.$store.state.setup.selected_employee.id,
        emp_name: $vm.$store.state.setup.selected_employee.name,


    }
    //fetch data from embeded device called machineLiveData
    var runningMachine = $vm.$store.state.setup.machineLiveData;
    function breakType() {
      var check = {
          break_reason: '',
          break_type: 'UNPLANNED',
          action: false,
      };

      if (!runningMachine.machine) {
          for (var i = 0; i < $vm.$store.state.db.breaks.length; i++) {
              var x = $vm.$store.state.db.breaks[i]
              if (x.start_time <= $vm.$store.state.setup.time && $vm.$store.state.setup.time <= x.end_time) {
                  check = {
                      break_reason: x.name,
                      break_type: 'PLANNED',
                      action: false,
                  };

                  break;
              }
          }

      }
      return check;
  }
    if (!_.isEmpty(runningMachine))
        //


        if ($vm.$store.state.setup.machineSessionId.machine_client_id=='')

    {
//k
        var machineSessionId = {
            machine_client_id:new Date().valueOf() + $vm.$store.state.setup.selected_machine.id ,//ok random
            start_time: moment().format($vm.$store.state.setup.bgTimeFormat), //must
            end_time:  moment().format($vm.$store.state.setup.bgTimeFormat), //must
            isClosed:false,
            date: moment().format($vm.$store.state.setup.bgDateFormat),
        };

        $vm.$store.commit('machineSessionId',_.cloneDeep(machineSessionId))

    }

    if (_.isEmpty($vm.$store.state.setup.machineSessionId)) {

        return;
    }




// $vm.$store.commit('createMachineEntryPartNo', createMachineEntry)
 
    //CHECKING PLANNED
    var currentMachine = {
        stroke: parseFloat(runningMachine.stroke).toFixed(2),
        machine_client_id: $vm.$store.state.setup.machineSessionId.machine_client_id,
        machine_id: $vm.$store.state.setup.selected_machine.id,
        machine_name: $vm.$store.state.setup.selected_machine.name,
        machine_date: new moment().format("YYYY-MM-DD"),
        machine_time: new moment().format("HH:mm"),
        machine_active_status: runningMachine.machine ? 'ON' : 'OFF',
        //in work--progress
        break_type: breakType().break_type, //runningMachine.machine?'NONE':break_type().break_type,//'UNPLANNED/PLANNED',
        break_reason: breakType().break_reason //runningMachine.machine?break_type().break_reason:'UNPLANNED',
        // break_id:runningMachine.machine?'Tea Break':'UNPLANNED',
    }
    var prepare = {
        ...company,
        ...shift,
        ...selected_product,
        ...selected_employee,
        ...currentMachine,
        // ...$vm.$store.state.setup.machineLiveData,
        // machine_date:new moment().format("YYYY-MM-DD"),
        // machine_time:new moment().format("hh:mm:ss")
    }

    // console.log("prepare",prepare)
    liveMachine.push(prepare)
    // liveMachine = _.uniqBy(liveMachine, 'stroke')
    $vm.$store.commit('machineActivities',_.cloneDeep(prepare))
    // $vm.$store.dispatch('createMachineActivity',{company_id:1,..._.cloneDeep(prepare)})
//-------------------database---------------
    // $vm.$store.dispatch('SK_IO_CREATE_MACHINE_ACTIVITY',{..._.cloneDeep(prepare)})
    // $vm.$store.dispatch('SK_IO_INSERT_MACHINE_PART_NO',{products:$vm.globalRunningProducts.products,prepare:_.cloneDeep(prepare)})
    // $vm.$store.dispatch('SK_IO_INSERT_MACHINE_MAIN',{prepare:_.cloneDeep(prepare)})
    console.log("Live Machine", liveMachine)



    callback({
        SK_IO_INSERT_MACHINE_MAIN:SK_IO_INSERT_MACHINE_MAIN($vm,{prepare:_.cloneDeep(prepare)}),
        SK_IO_INSERT_MACHINE_PART_NO:SK_IO_INSERT_MACHINE_PART_NO($vm,{products:$vm.globalRunningProducts.products,prepare:_.cloneDeep(prepare)}),
        SK_IO_CREATE_MACHINE_ACTIVITY:{data:_.cloneDeep(prepare)}
       
    })
}

function SK_IO_INSERT_MACHINE_PART_NO($vm,payload){
    console.log("----payload----")
    console.log(payload)
   return     _.map(payload.products,(product)=>{
            var dataset={
                part_no:product.part_no,
                product_id:product.id,
                company_id:$vm.$store.state.setup.selected_company.id,
                shift_id: $vm.$store.state.setup.selected_shift.id,
                emp_id: $vm.$store.state.setup.selected_employee.id,
                machine_client_id:payload.prepare.machine_client_id,
                machine_id: $vm.$store.state.setup.selected_machine.id,
                total_count:0,
                good_count:0,
                reject_count:0,
                ideal_cycle:1,
                machine_date:payload.prepare.machine_date,
                machine_time:payload.prepare.machine_time
            }
            
    return {data:dataset};
        })
    
    }

function  SK_IO_INSERT_MACHINE_MAIN($vm,payload){

        var dataset={
            company_id:$vm.$store.state.setup.selected_company.id,
            shift_id: $vm.$store.state.setup.selected_shift.id,
            emp_id: $vm.$store.state.setup.selected_employee.id,
            machine_client_id:payload.prepare.machine_client_id,
            machine_id: $vm.$store.state.setup.selected_machine.id,
            machine_date:payload.prepare.machine_date,
            machine_time:payload.prepare.machine_time,
            is_closed:false,
            // machine_active_status:payload.prepare.machine_active_status
        }
        
        return {data:dataset};
    
    
    }
    