import moment from 'moment'
import _ from 'lodash'
import Vue from 'vue'
const mutations={

  createShift(state,payload){
    // console.log("--shift---",payload)
    state.setup.shifts.push(payload)

  },
    setDate(state){
        state.setup.date=moment().format('YYYY-MM-DD')
      },
  
    setTimeEverySecond(state){
      state.setup.time=moment().format('hh:mm')
    }
,
    createCompany(state,payload){
      state.db.companies.push(payload)
    },
    checkCompany(state,payload){
      _.filter(state.db.companies,(x)=>x.username==payload.username&&payload.password)
    },
    createGroup(state,payload){
state.db.groups.push(payload)
    },
setCompany(state,payload){
state.setup.company={
id:payload.id,
email:payload.email,
password:payload.password
      }
  },
 setMachineStatus(state,value){
   state.setup.checkMachine=value
 } ,
 setEmbededStatus(state,value){
  
  state.setup.checkEmbededDevice=value
 } ,
 setDialog(state,payload)
{
  Vue.set(state.dialog,payload.key,payload.value)
},

watchMachine(state,value){
  state.setup.watchMachine=value;
}
,
machineLiveData(state,value){
  // console.log("machine Live Data",value)
  // state.setup.machineLiveData=value;
  Vue.set(state.setup,'machineLiveData',value)
}
,
setShift(state,value){
// console.log("value",value)
if(state.setup.autoShift){
Vue.set(state.setup,'selected_shift',{
  id:value.id,
  name:value.name,
  group:value.group,
  start_time:value.start_time,
  end_time:value.end_time
  })
}
}
//----------------machine track-----------
,
createMachineEntryParent(state,value){

  state.setup.createMachineEntryParent=value

}
,
machineSessionId(state,value){
  // console.log("machine set id||||||",value)
    // state.setup.machineSessionId=value
  Vue.set(state.setup,'machineSessionId',value)
  }
,  
clearMachineSessionId(state){
Vue.set(state.setup.machineSessionId,'machine_client_id','')
Vue.set(state.setup.machineSessionId,'start_time','')
Vue.set(state.setup.machineSessionId,'end_time','')
Vue.set(state.setup.machineSessionId,'isClosed','')
Vue.set(state.setup.machineSessionId,'date','')
}

,


// selected_machine_runned_main(state,value){

//   state.setup.selected_machine_runned_main=value

// },
// selected_runned_part_no(state,value){

//   state.setup.selected_runned_part_no=value

// },

createMachineEntryChild(state,value){

  state.setup.createMachineEntryChild.push(value)

},
removeMainActivities(state){
  state.setup.machineActivities=[]
},
machineActivities(state,value){

  state.setup.machineActivities.push(value)

}
,
//--------------------change widget----------
setProduct(state,payload){
  state.setup.selected_product.id=payload.id
  state.setup.selected_product.part_no=payload.part_no
  state.setup.selected_product.material_code=payload.material_code
  state.setup.selected_product.grn_no=payload.grn_no
  state.setup.selected_product.name=payload.name
  state.setup.selected_product.group=payload.group
  state.setup.selected_product.other_detail=payload.other_detail
  state.setup.selected_product.other=payload.other
},
setShiftManually(state,payload){

state.setup.selected_shift.id=payload.id;
state.setup.selected_shift.name=payload.name;
state.setup.selected_shift.group=payload.group;
state.setup.selected_shift.creator_id=payload.creator_id;
state.setup.selected_shift.creator_role=payload.creator_role;
state.setup.selected_shift.start_time=payload.start_time;
state.setup.selected_shift.end_time=payload.end_time;

},
GET_PRODUCTS(state,payload){
  // console.log("set Products",payload,Array.isArray(payload))
if(Array.isArray(payload)) 
Vue.set(state.db,'products',payload)

},
SET_EMPLOYEE(state,payload)
{
  if(_.isEmpty(payload)) return;
  state.setup.selected_employee.id=payload.id;//
  state.setup.selected_employee.branch=payload.branch;//
  state.setup.selected_employee.company_id=payload.company_id;//
  state.setup.selected_employee.name=payload.name;//
  state.setup.selected_employee.password=payload.password;//
  state.setup.selected_employee.email=payload.email;//
  state.setup.selected_employee.role=payload.role;//
  state.setup.selected_employee.phone=payload.phone;//
  state.setup.selected_employee.id_card=payload.id_card;
  state.setup.selected_employee.other=payload.other;//

},
CLEAR_EMPLOYEE(state,payload)
{
  if(_.isEmpty(payload)) return;
  state.setup.selected_employee.id=""
  state.setup.selected_employee.branch=""
  state.setup.selected_employee.company_id="";//
  state.setup.selected_employee.name=""
  state.setup.selected_employee.password=""
  state.setup.selected_employee.email=""
  state.setup.selected_employee.role=""
  state.setup.selected_employee.phone=""
  state.setup.selected_employee.id_card="";
  state.setup.selected_employee.other=""
  

},
// setMachine(state,payload)
// {
//   state.setup.selected_machine.id=payload.id
//   state.setup.selected_machine.name=payload.name
//   state.setup.selected_machine.code=payload.code
//   state.setup.selected_machine.detail=payload.detail
//   state.setup.selected_machine.group=payload.group
//   state.setup.selected_machine.company_id=payload.company_id
//   state.setup.selected_machine.creator_id=payload.creator_id
//   state.setup.selected_machine.creator_role=payload.creator_role
//   state.setup.selected_machine.branch=payload.branch
//   state.setup.selected_machine.hours=payload.hours
//   state.setup.selected_machine.description=payload.description
//   state.setup.selected_machine.other=payload.other


// },
SET_MACHINE(state,data){
  if(_.isEmpty(data)) return;
  state.setup.selected_machine.id=data.id
  state.setup.selected_machine.code=data.code
  state.setup.selected_machine.branch=data.branch
  state.setup.selected_machine.name=data.name
  state.setup.selected_machine.group=data.group
  state.setup.selected_machine.hours=data.hours
  state.setup.selected_machine.detail=data.detail
  state.setup.selected_machine.description=data.description
  state.setup.selected_machine.other=data.other
},

MACHINE_LOGOUT(state){
state.setup.selected_machine.id=""
state.setup.selected_machine.code=""
state.setup.selected_machine.branch=""
state.setup.selected_machine.name=""
state.setup.selected_machine.group=""
state.setup.selected_machine.hours=""
state.setup.selected_machine.detail=""
state.setup.selected_machine.description=""
state.setup.selected_machine.other=""
},
CLEAR_COMPANY(state)
{
state.setup.selected_company.id=""
state.setup.selected_company.name=""
state.setup.selected_company.email=""
},

SET_COMPANY(state,data)
{
  if(_.isEmpty(data))return;
state.setup.selected_company.id=data.id
state.setup.selected_company.name=data.name
state.setup.selected_company.email=data.email
},
SET_SHIFT(state,data)
{
  if(_.isEmpty(data))return;
state.db.shifts=data
},
SET_DOWNTIME(state,data)
{
  if(_.isEmpty(data))return;
state.db.down_time=data
},
SET_BREAK(state,data)
{
  if(_.isEmpty(data))return;
  state.db.breaks=data

},


LOCAL_SK_IO_MACHINE_PART_NO(state,payload)
{
  Vue.set(state.global,'LOCAL_SK_IO_MACHINE_PART_NO',payload)

},
runned(state,value){

  state.runned.MACHINE_RUNNED_MAIN=value.MACHINE_RUNNED_MAIN
  state.runned.MACHINE_RUNNED_PART_NO=value.MACHINE_RUNNED_PART_NO
  state.runned.MACHINE_RUNNED_ACTIVITY=value.MACHINE_RUNNED_ACTIVITY

},
MACHINE_RUNNED_MAIN(state,payload)
{ 
  //  console.log("MACHINE_RUNNED_MAIN++",payload)
  Vue.set(state.runned,'MACHINE_RUNNED_MAIN',payload)
  
},
GET_MACHINE_RUNNING_PART_NO(state,payload)
{  //console.log(payload)
  Vue.set(state.running,'MACHINE_RUNNING_PART_NO',payload)
  
},
GET_MACHINE_RUNNING_MAIN(state,payload)
{ // console.log(payload)
  Vue.set(state.running,'MACHINE_RUNNING_MAIN',payload)
   
}
,
GET_MACHINE_RUNNING_ACTIVITY(state,payload)
{  //console.log(payload)
  Vue.set(state.running,'MACHINE_RUNNING_ACTIVITY',payload)
   
}




}




export default mutations;