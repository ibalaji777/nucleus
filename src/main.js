import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'

import timeChart from './views/timeChart.vue'
import barChart from './views/barChart.vue'
import pieChart from './views/pieChart.vue'
import doughnutChart from './views/doughnutChart.vue'
import percentageChart from './views/percentageChart.vue'


Vue.component('timeChart',timeChart);
Vue.component('barChart',barChart);
Vue.component('pieChart',pieChart);
Vue.component('doughnutChart',doughnutChart);
Vue.component('percentageChart',percentageChart);

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
