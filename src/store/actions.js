/*eslint-disable*/
const axios = require('axios').default;
import {
    _
} from 'core-js';

import * as socketConfig from '../../src/core/socketConfig.js'
var url = 'http://127.0.0.1:3333/'
var api = 'http://127.0.0.1:3333/api/'
var createMachineActivityApi = url + 'machine_activity';
var apiEmployeeLogin = api + 'machine_employee_signin'
var apiMachineLogin = api + 'machine_login'
var apiGetProducts = api + 'get_products ';
var apiGetMachineStatusByDate = api + 'get_machines_main_status_by_date'

var apiGetMachineRunningPartNo = api + 'get_machine_running_part_no'
var apiGetMachineRunningMain = api + 'get_machine_running_main'
var apiGetMachineRunningActivity = api + 'get_machine_running_activity'
const actions = {

    //------------------api----------------------------

    createMachineActivity(context, payload) {

        axios.post(createMachineActivityApi, {
                data: payload
            })
            .then((data) => {

                console.log(data)
            })
            .catch((err) => {
                console.log(err)

            })


    },

    //------------------api----------------------------
    createShift(context, payload) {
        context.commit('createShift', payload)
    },
    createCompany(context, payload) {
        context.commit('createCompany', payload)
    },
    checkCompany(context, payload) {
        context.commit('checkCompany', payload)
    },
    createGroup(context, payload) {
        context.commit('createGroup', payload)
    },
    setCompany(context, payload) {
        context.commit('setCompany', payload)
    },

    async GET_MACHINE_RUNNING_PART_NO(context){
return new Promise((resolve,reject)=>{
    var machine_client_id=context.state.setup.machineSessionId.machine_client_id
    var machine_id=context.state.setup.selected_machine.id

    console.log("get machine running part no ")
        var result = axios.post(apiGetMachineRunningPartNo, {
            data: {machine_id,machine_client_id}
        }).then((result)=>{


            context.commit('GET_MACHINE_RUNNING_PART_NO',result.data.data)
        resolve(result)
        })
        .catch(()=>{
reject();
        });

        return result;
    })
    },
    async GET_MACHINE_RUNNING_MAIN(context){
        return new Promise((resolve,reject)=>{
            var machine_client_id=context.state.setup.machineSessionId.machine_client_id
            var machine_id=context.state.setup.selected_machine.id
        
            console.log("get machine running MAIN ")
                var result = axios.post(apiGetMachineRunningMain, {
                    data: {machine_id,machine_client_id}
                }).then((result)=>{
        
        
                    context.commit('GET_MACHINE_RUNNING_MAIN',result.data.data)
                resolve(result)
                })
                .catch(()=>{
        reject();
                });
        
                return result;
            })
            },
            async GET_MACHINE_RUNNING_ACTIVITY(context){
                return new Promise((resolve,reject)=>{
                    var machine_client_id=context.state.setup.machineSessionId.machine_client_id
                    var machine_id=context.state.setup.selected_machine.id
                

                        var result = axios.post(apiGetMachineRunningActivity, {
                            data: {machine_id,machine_client_id}
                        }).then((result)=>{
                
               
                            context.commit('GET_MACHINE_RUNNING_ACTIVITY',result.data.data)
                        resolve(result)
                        })
                        .catch(()=>{
                reject();
                        });
                
                        return result;
                    })
                    },
    async GET_MACHINE_STATUS_BY_DATE(context, payload) {

        console.log("get machine status by date ", payload)
        var result = await axios.post(apiGetMachineStatusByDate, {
            data: payload
        });

        return result;

    },
    GET_PRODUCTS(context, payload) {
        return new Promise((resolve, reject) => {
                axios.post(apiGetProducts, {
                        data: {
                             company_id: context.state.setup.selected_company.id
                        }
                    })
                    .then((result) => {
                            context.commit('GET_PRODUCTS', result.data)
                    })

                resolve()
            })
            .catch(() => {
                reject()
            })

    },

    async EMPLOYEE_SIGNIN(context, payload) {
        var result = await axios.post(apiEmployeeLogin, {
            data: payload
        })
        if (result.data.success) {
            context.commit('SET_EMPLOYEE', result.data.data)
        }
        console.log("EMPLOYEE_SIGNIN", result)
        return result

    },
    async MACHINE_LOGIN(context, payload) {
        var result = await axios.post(apiMachineLogin, {
            data: payload
        })
        if (result.data.success) {

            context.commit('SET_MACHINE', result.data.data.machine)
            context.commit('SET_COMPANY', result.data.data.company)
            context.commit('SET_SHIFT', result.data.data.shift)
            context.commit('SET_DOWNTIME', result.data.data.down_time)
            context.commit('SET_BREAK', result.data.data.breaks)
        }
        console.log(result)
        return result;
    }


}


export default actions;