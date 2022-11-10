/*eslint-disable*/
const axios = require('axios').default;
import { _ } from 'core-js';
import * as socketConfig from '../../src/core/socketConfig.js'
var url='http://127.0.0.1:3333/'
var createMachineActivityApi=url+'machine_activity';
const actions={

//------------------api----------------------------

createMachineActivity(context,payload){

    axios.post(createMachineActivityApi,{data:payload})
    .then((data)=>{

        console.log(data)
    })
    .catch((err)=>{
        console.log(err)

    })


},
SK_IO_CREATE_MACHINE_ACTIVITY(context,payload){

socketConfig.createMachineActivity({data:payload})
},
SK_IO_INSERT_MACHINE_PART_NO(context,payload){

    _.map(payload.products,(product)=>{
        var dataset={
            part_no:product.part_no,
            product_id:product.id,
            company_id:context.state.setup.selected_company.id,
            shift_id: context.state.setup.selected_shift.id,
            emp_id: context.state.setup.selected_employee.id,
            machine_client_id:payload.prepare.machine_client_id,
            machine_id: context.state.setup.selected_machine.id,
            total_count:0,
            good_count:0,
            reject_count:0,
            ideal_cycle:1,
            machine_date:payload.prepare.machine_date,
            machine_time:payload.prepare.machine_time
        }
        
        socketConfig.SK_IO_INSERT_MACHINE_PART_NO({data:dataset})

    })

},
SK_IO_INSERT_MACHINE_MAIN(context,payload){

    var dataset={
        company_id:context.state.setup.selected_company.id,
        shift_id: context.state.setup.selected_shift.id,
        emp_id: context.state.setup.selected_employee.id,
        machine_client_id:payload.prepare.machine_client_id,
        machine_id: context.state.setup.selected_machine.id,
        machine_date:payload.prepare.machine_date,
        machine_time:payload.prepare.machine_time
    }
    
    socketConfig.SK_IO_INSERT_MACHINE_PART_NO({data:dataset})


},
//------------------api----------------------------
    createShift(context,payload){
        context.commit('createShift',payload)
    },
    createCompany(context,payload){
        context.commit('createCompany',payload)
    },
    checkCompany(context,payload){
        context.commit('checkCompany',payload)
    },
    createGroup(context,payload){
        context.commit('createGroup',payload)
    },
    setCompany(context,payload){
        context.commit('setCompany',payload)
    }


}


export default actions;