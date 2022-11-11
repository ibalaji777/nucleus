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
