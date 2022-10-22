import moment from 'moment'
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
//"hh:mm:ss a"
}


export default mutations;