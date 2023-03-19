/*eslint-disable*/
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import * as globalMixin from "./globalMixin.js";
import stackbarChart from "./views/stackbarChart.vue";
import changeWidget from "./views/changeWidget.vue";
import timeChart from "./views/timeChart.vue";
import timeChartStatus from "./views/timeChartStatus.vue";
import timeChartStatus2 from "./views/timeChartStatus2.vue";
import timeChartStatus3 from "./views/timeChartStatus3.vue";
import barChart from "./views/barChart.vue";
import pieChart from "./views/pieChart.vue";
import doughnutChart from "./views/doughnutChart.vue";
import percentageChart from "./views/percentageChart.vue";
import heatMap from "./views/heatMap.vue";
import VueSimpleAlert from "vue-simple-alert";
import widgetHeader from "./views/widgetHeader.vue";

import demoMachineDialog from "./views/demoMachineDialog.vue";

import selectEmployeeWidget from "./views/selectEmployeeWidget.vue";
import selectMachine from "./views/selectMachine.vue";
import selectProduct from "./views/selectProduct.vue";

import widgetNavbar from "./views/widgetNavbar.vue";
import oeePanel from "./views/oeePanel.vue";
import errorsDialog from "./views/errorsDialog.vue";

Vue.use(VueSimpleAlert);

import loadMaterialDialog from "./views/loadMaterialDialog.vue";
import productWidget from "./views/productWidget.vue";
import shiftWidget from "./views/shiftWidget.vue";
import empLoginWidget from "./views/empLoginWidget.vue";
import machineWidget from "./views/machineWidget.vue";
import date from "../src/views/date.vue";
import closeShiftWidget from "../src/views/closeShiftWidget.vue";
import machineActionDialog from "./views/machineActionDialog.vue";

import oeeSetupDialog from "./views/oeeSetupDialog.vue";

import history from "./views/tables/history.vue";

import wave from "./views/widget/wave.vue";
import machineLogs from "./views/widget/machineLogs.vue";

import logsDialog from "./views/logsDialog.vue";

import VueToast from "vue-toast-notification";
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import "vue-toast-notification/dist/theme-bootstrap.css";

Vue.use(VueToast);
Vue.component("errorsDialog", errorsDialog);

Vue.component("logsDialog", logsDialog);

Vue.component("machineLog", machineLogs);
Vue.component("wave", wave);

Vue.component("history", history);

Vue.component("oeeSetupDialog", oeeSetupDialog);

Vue.component("machineActionDialog", machineActionDialog);

Vue.component("date", date);
Vue.component("loadMaterialDialog", loadMaterialDialog);
Vue.component("shiftWidget", shiftWidget);
Vue.component("empLoginWidget", empLoginWidget);
Vue.component("machineWidget", machineWidget);
Vue.component("productWidget", productWidget);
Vue.component("closeShiftWidget", closeShiftWidget);

Vue.component("heatMap", heatMap);

Vue.component("changeWidget", changeWidget);
Vue.component("demoMachineDialog", demoMachineDialog);
Vue.component("selectProduct", selectProduct);
Vue.component("selectEmployeeWidget", selectEmployeeWidget);
Vue.component("selectMachine", selectMachine);
Vue.component("widgetNavbar", widgetNavbar);
Vue.component("stackbarChart", stackbarChart);
Vue.component("timeChartStatus3", timeChartStatus3);
Vue.component("timeChartStatus2", timeChartStatus2);
Vue.component("timeChartStatus", timeChartStatus);
Vue.component("timeChart", timeChart);
Vue.component("barChart", barChart);
Vue.component("pieChart", pieChart);
Vue.component("doughnutChart", doughnutChart);
Vue.component("percentageChart", percentageChart);
Vue.component("widgetHeader", widgetHeader);
Vue.component("oeePanel", oeePanel);

Vue.config.productionTip = false;

new Vue({
 store,
 router,
 vuetify,
 render: (h) => h(App),
}).$mount("#app");
