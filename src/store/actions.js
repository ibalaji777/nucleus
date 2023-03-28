/*eslint-disable*/
const axios = require("axios").default;
import moment from "moment";
import { _ } from "core-js";
import * as config from "../core/config.js";
import * as socketConfig from "../../src/core/socketConfig.js";
var url = "http://127.0.0.1:3333/";
var api = config.backend + "/api/";
var sP = config.serialPortUrl;
var createMachineActivityApi = url + "machine_activity";
var apiEmployeeLogin = api + "machine_employee_signin";
var apiMachineLogin = api + "machine_login";
var apiGetProducts = api + "get_products ";
var apiGetMachineStatusByDate = api + "get_machines_main_status_by_date";

var apiGetMachineRunningPartNo = api + "get_machine_running_part_no";
var apiGetMachineRunningMain = api + "get_machine_running_main";
var apiGetMachineRunningActivity = api + "get_machine_running_activity";

//new  api's

var watchMachineApi = api + "watch-machine";
var saveMachineApi = api + "save-machine";
var apiCloseShift = api + "close_shift";

var machineLogsApi = api + "machine-logs";
var markDownTimeApi = api + "mark-downtime";
var markoeeinfoApi = api + "mark-oee-info";
var machineDataApi = api + "get-machine-data";

var logMachineDataApi = api + "log-datafeed";

var updateOeeApi = api + "update-oee";
//serial port communication

const actions = {
 feedDataToServer(context, payload) {
  return new Promise((resolve, reject) => {
   const { id, actual_count, rejected_count, pieces_per_stroke, emp_remarks } =
    payload;

   axios
    .post(logMachineDataApi, {
     data: {
      id,
      actual_count,
      rejected_count,
      pieces_per_stroke,
      emp_remarks,
     },
    })
    .then((res) => {
     console.log(res);
     resolve(res);
    })
    .catch((err) => {
     reject(err);
     console.log(err);
    });
  });
 },

 saveDataToServer(context, payload) {
  return new Promise((resolve, reject) => {
   axios
    .post(saveMachineApi, {
     data: context.state.machineData,
    })
    .then((res) => {
     resolve(res);
    })
    .catch((err) => {
     reject();
    });
  });
 },

 syncToServer(context, payload) {
  if (state.machineData.machineHisotry.length == 0) return;
  axios
   .post(watchMachineApi, {
    data: context.state.machineData,
   })
   .then((res) => {
    // context
    // if (res.data) context.commit("MACHINE_LOGS", res.data);
   })
   .catch((err) => {
    console.log(err);
   });
 },
 deviceAlert(context, action) {
  if (action == "on") {
   axios
    .get(sP + "/alertOn")
    .then((res) => {})
    .catch((err) => {
     console.log(err);
    });
  }
  if (action == "on") {
   axios
    .get(sP + "/alertOff")
    .then((res) => {})
    .catch((err) => {
     console.log(err);
    });
  }
 },

 UPDATE_OEE(context, payload) {
  let dataset = {
   uq: context.state.setup.uq,
   machine_id: context.state.setup.selected_machine.id,
   ...payload,
  };

  axios
   .post(updateOeeApi, {
    data: {
     machine_id,
    },
   })
   .then((res) => {
    // context
    if (res.data) context.commit("MACHINE_LOGS", res.data);
   })
   .catch((err) => {
    console.log(err);
   });
 },

 MACHINE_LOGS(context) {
  let machine_id = context.state.setup.selected_machine.id;
  axios
   .post(machineLogsApi, {
    data: {
     machine_id,
    },
   })
   .then((res) => {
    // context
    if (res.data) context.commit("MACHINE_LOGS", res.data);
   })
   .catch((err) => {
    console.log(err);
   });
 },
 MACHINE_DATA(context) {
  let payload = {
   uq: context.state.setup.uq,
   machine_id: context.state.setup.selected_machine.id,
  };
  return new Promise((resolve, reject) => {
   axios
    .post(markoeeinfoApi, {
     data: payload,
    })
    .then((res) => {
     resolve(res);
     actions.MACHINE_LOGS(context);
    })
    .catch((err) => {
     reject();
    });
  });
 },

 //  MACHINE_LOG_DATA(context, data) {

 //  },

 //  MACHINE_LOG_DATA(context, data) {
 //   let payload = {
 //    uq: context.state.setup.uq,
 //    machine_id: context.state.setup.selected_machine.id,
 //    ...data,
 //   };

 //   axios
 //    .post(markoeeinfoApi, {
 //     data: payload,
 //    })
 //    .then((res) => {
 //     actions.MACHINE_LOGS(context);
 //    })
 //    .catch((err) => {
 //     console.log(err);
 //    });
 //  },

 MARK_DOWNTIME(context, payload) {
  axios
   .post(markDownTimeApi, {
    data: payload,
   })
   .then((res) => {
    console.log(res.data);
    context.commit("machineData", res.data);
   })
   .catch((err) => {
    console.log(err);
   });
 },
 WATCH_MACHINE(context, payload) {
  context.commit("machineData", payload);
 },

 //  WATCH_MACHINE(context, payload) {
 //   axios
 //    .post(watchMachineApi, {
 //     data: payload,
 //    })
 //    .then((res) => {
 //     console.log(res.data);

 //     context.commit("machineData", res.data);

 //     // context.commit("machineHistory", res.data.history);
 //     //    console.log(data)
 //    })
 //    .catch((err) => {
 //     console.log(err);
 //    });
 //  },

 //------------------api----------------------------
 async CLOSE_SHIFT(context, payload) {
  var machine_client_id =
   context.state.setup.machineSessionId.machine_client_id;
  var machine_id = context.state.setup.selected_machine.id;
  var prepare = {
   machine_id,
   machine_client_id,
   MACHINE_RUNNED_MAIN: payload.MACHINE_RUNNED_MAIN,
   MACHINE_RUNNED_PART_NO: payload.MACHINE_RUNNED_PART_NO,
  };
  var result = await axios.post(apiCloseShift, {
   data: prepare,
  });

  return result;
 },

 createMachineActivity(context, payload) {
  axios
   .post(createMachineActivityApi, {
    data: payload,
   })
   .then((data) => {
    console.log(data);
   })
   .catch((err) => {
    console.log(err);
   });
 },

 //------------------api----------------------------
 createShift(context, payload) {
  context.commit("createShift", payload);
 },
 createCompany(context, payload) {
  context.commit("createCompany", payload);
 },
 checkCompany(context, payload) {
  context.commit("checkCompany", payload);
 },
 createGroup(context, payload) {
  context.commit("createGroup", payload);
 },
 setCompany(context, payload) {
  context.commit("setCompany", payload);
 },

 async GET_MACHINE_RUNNING_PART_NO(context) {
  return new Promise((resolve, reject) => {
   var machine_client_id =
    context.state.setup.machineSessionId.machine_client_id;
   var machine_id = context.state.setup.selected_machine.id;
   if (machine_client_id == "") return;
   console.log("get machine running part no ");
   var result = axios
    .post(apiGetMachineRunningPartNo, {
     data: { machine_id, machine_client_id },
    })
    .then((result) => {
     context.commit("GET_MACHINE_RUNNING_PART_NO", result.data.data);
     resolve(result);
    })
    .catch(() => {
     reject();
    });

   return result;
  });
 },
 async GET_MACHINE_RUNNING_MAIN(context) {
  return new Promise((resolve, reject) => {
   var machine_client_id =
    context.state.setup.machineSessionId.machine_client_id;
   var machine_id = context.state.setup.selected_machine.id;
   if (machine_client_id == "") return;
   console.log("get machine running MAIN ");
   var result = axios
    .post(apiGetMachineRunningMain, {
     data: { machine_id, machine_client_id },
    })
    .then((result) => {
     context.commit("GET_MACHINE_RUNNING_MAIN", result.data.data);
     resolve(result);
    })
    .catch(() => {
     reject();
    });

   return result;
  });
 },
 async GET_MACHINE_RUNNING_ACTIVITY(context) {
  return new Promise((resolve, reject) => {
   var machine_client_id =
    context.state.setup.machineSessionId.machine_client_id;
   var machine_id = context.state.setup.selected_machine.id;

   if (machine_client_id == "") return;

   var result = axios
    .post(apiGetMachineRunningActivity, {
     data: { machine_id, machine_client_id },
    })
    .then((result) => {
     context.commit("GET_MACHINE_RUNNING_ACTIVITY", result.data.data);
     resolve(result);
    })
    .catch(() => {
     reject();
    });

   return result;
  });
 },
 async GET_MACHINE_STATUS_BY_DATE(context, payload) {
  var machine_id = context.state.setup.selected_machine.id;
  var from_date = moment().format(context.state.setup.bgDateFormat);
  var to_date = moment().format(context.state.setup.bgDateFormat);

  // const {

  // }=payload
  console.log("get machine status by date ", payload);
  var result = await axios.post(apiGetMachineStatusByDate, {
   data: { from_date, to_date, machine_id },
  });
  context.commit("MACHINE_RUNNED_MAIN", result.data.data);
  return result;
 },
 GET_PRODUCTS(context, payload) {
  return new Promise((resolve, reject) => {
   axios
    .post(apiGetProducts, {
     data: {
      company_id: context.state.setup.selected_company.id,
     },
    })
    .then((result) => {
     context.commit("GET_PRODUCTS", result.data);
    });

   resolve();
  }).catch(() => {
   reject();
  });
 },

 async EMPLOYEE_SIGNIN(context, payload) {
  var result = await axios.post(apiEmployeeLogin, {
   data: payload,
  });
  if (result.data.success) {
   context.commit("SET_EMPLOYEE", result.data.data);
  }
  console.log("EMPLOYEE_SIGNIN", result);
  return result;
 },
 async MACHINE_LOGIN(context, payload) {
  var result = await axios.post(apiMachineLogin, {
   data: payload,
  });
  if (result.data.success) {
   context.commit("SET_MACHINE", result.data.data.machine);
   context.commit("SET_COMPANY", result.data.data.company);
   context.commit("SET_SHIFT", result.data.data.shift);
   context.commit("SET_DOWNTIME", result.data.data.down_time);
   context.commit("SET_BREAK", result.data.data.breaks);
   context.commit("SET_SHEDULE", result.data.data.shedule);
  }
  console.log(result);
  return result;
 },
};

export default actions;
