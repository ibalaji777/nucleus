import moment from 'moment'
import _ from 'lodash'
import Vue from 'vue'
const mutations={

  createShift(state,payload){
    console.log("--shift---",payload)
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
  // console.log("setMachineStatus",value)
  state.setup.checkMachine=value
 } ,
 setEmbededStatus(state,value){
  // console.log("setMachineStatus",value)
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
  state.setup.machineLiveData=value;
}
,
setShift(state,value){
console.log("value",value)
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

//"hh:mm:ss a"
}




export default mutations;