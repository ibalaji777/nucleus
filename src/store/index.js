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
companies:state.db.companies,
groups:[],
    },
setup:{
  // selected_company:{
  //   id:state.setup.selected_company.id,
  //   email:state.setup.selected_company.email,
  //   password:state.setup.selected_company.password,
  // },
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
  shifts:state.setup.shifts,
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
