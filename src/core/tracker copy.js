var moment = require('moment')
import _ from 'lodash'
var liveMachine = [];
export function tracker($vm) {
    //ok
    var shift = {
        shift_id: $vm.$store.state.setup.selected_shift.id,
        shift_name: $vm.$store.state.setup.selected_shift.name,
    }
    //ok
    var selected_machine = {
        machine_id: '',
        machine_name: '',

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


        if (_.isEmpty($vm.$store.state.setup.createMachineEntryParent))

    {
//k
        var createMachineEntryParent = {
            id:1,
            company_id: $vm.$store.state.setup.selected_company.id,//OK
            branch_id: $vm.$store.state.setup.selected_branch.id,//OK
            machine_client_id: $vm.$store.state.setup.selected_machine.id + new Date().valueOf(),//ok random
            machine_id: $vm.$store.state.setup.selected_machine.id,//k
            machine_name: $vm.$store.state.setup.selected_machine.name,//k
            selectedStrokeType: 'manual',//k //auto or manual
            production_per_stroke_auto: '',//k
            production_per_stroke_manual: '',//k
            planned_hours: 8,
            ...shift,
            ...selected_employee,
            start_time: moment().format($vm.$store.state.setup.bgTimeFormat), //must
            end_time:  moment().format($vm.$store.state.setup.bgTimeFormat), //must
            isClosed:false,
            date: moment().format($vm.$store.state.setup.bgDateFormat),

        };

        $vm.$store.commit('createMachineEntryParent', createMachineEntryParent)

    }

    if (_.isEmpty($vm.$store.state.setup.createMachineEntryParent)) {

        return;
    }

//create part no with machine id



// $vm.$store.commit('createMachineEntryPartNo', createMachineEntry)
 
    //CHECKING PLANNED
    var currentMachine = {
        stroke: parseFloat(runningMachine.stroke).toFixed(2),
        machine_client_id: $vm.$store.state.setup.createMachineEntryParent.client_id,
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
        ...shift,
        ...selected_machine,
        ...selected_product,
        ...selected_employee,
        ...currentMachine,
        // ...$vm.$store.state.setup.machineLiveData,
        // machine_date:new moment().format("YYYY-MM-DD"),
        // machine_time:new moment().format("hh:mm:ss")
    }
    liveMachine.push(prepare)
    liveMachine = _.uniqBy(liveMachine, 'stroke')
    $vm.$store.commit('createMachineEntryChild', prepare)

    console.log("Live Machine", liveMachine)
}