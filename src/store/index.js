import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations.js'
import actions from './actions.js'
import state from './state.js'
Vue.use(Vuex)
import VuexPersistence from 'vuex-persist'

const vuexPersist = new VuexPersistence({
  // strictMode: true, // This **MUST** be set to true
  storage: localStorage,
  reducer: (state) => ({ 
    db:{
shifts:state.db.shifts,
down_time:state.db.down_time,
breaks:state.db.breaks,
products:state.db.products,
shedule:state.db.shedule
    },
setup:{
  machineSessionId:state.setup.machineSessionId,
  selected_product:state.setup.selected_product,
  selected_machine:{
    id:state.setup.selected_machine.id,
    code:state.setup.selected_machine.code,
    branch:state.setup.selected_machine.branch,
    name:state.setup.selected_machine.name,
    group:state.setup.selected_machine.group,
    hours:state.setup.selected_machine.hours,
    detail:state.setup.selected_machine.detail,
    description:state.setup.selected_machine.description,
    other:state.setup.selected_machine.other,
  },
  selected_company:{
    id:state.setup.selected_company.id,
    name:state.setup.selected_company.name,
    email:state.setup.selected_company.email,
 },
}


  }),

})
 

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
  },
  plugins: [vuexPersist.plugin]
})
