import moment from 'moment'
import _ from 'lodash'
const mutations={

  createShift(state,payload){
    console.log("--shift---",payload)
    state.setup.shifts.push(payload)

  },
    setDate(state){
        state.setup.date=moment().format()
      },
  

    setTimeEverySecond(state){
      state.setup.time=moment().format()
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
  }

//"hh:mm:ss a"
}


export default mutations;