/*eslint-disable*/
import moment from "moment";
import _ from "lodash";
import Vue from "vue";
import { v4 as uuidv4 } from "uuid";

function updateMachineData(machineData, dateTime, stroke) {
 machineData.end_stroke = stroke;
 machineData.actual_stroke =
  parseFloat(machineData.end_stroke || 0) -
  parseFloat(machineData.start_stroke || 0);
 machineData.end_time = dateTime;
 machineData.duration = moment(String(machineData.end_time)).diff(
  moment(String(machineData.start_time)),
  "seconds"
 );
}

function updateMachineLog(machineData, data, dateTime, stroke) {
 console.log("log udpate", data);
 machineData.operation = data.operation;
 machineData.action = data.action;
 machineData.end_stroke = stroke;
 machineData.actual_stroke =
  parseFloat(machineData.end_stroke || 0) -
  parseFloat(machineData.start_stroke || 0);
 machineData.end_time = dateTime;
 machineData.duration = moment(String(machineData.end_time)).diff(
  moment(String(machineData.start_time)),
  "seconds"
 );
}

const mutations = {
 login(state, payload) {
  state.login.username = payload.username;
  state.login.password = payload.password;
 },
 logout(state) {
  state.login.username = "";
  state.login.password = "";
 },

 CLEAR_MACHINE_DATA(state) {
  Vue.set(state.machineData, "machineLog", {});
  Vue.set(state.machineData, "machineHisotry", []);
 },
 machineWatcher(state, payload) {
  state.isMachineWatcher = payload;
 },
 MARK_DOWNTIME(state, payload) {
  let previousData = _.cloneDeep(
   state.machineData.machineHisotry[payload.index]
  );
  state.machineData.machineHisotry[payload.index] = {
   ...previousData,
   ...payload.dataset,
  };
 },
 MARK_BREAK(state, payload) {
  let previousData = _.cloneDeep(
   state.machineData.machineHisotry[payload.index]
  );
  state.machineData.machineHisotry[payload.index] = {
   ...previousData,
   ...payload.dataset,
  };
 },
 MARK_OEE_INFO(state, payload) {
  // let previousData = _.cloneDeep(
  //  state.machineData.machineHisotry[payload.index]
  // );
  // state.machineData.machineHisotry[payload.index] = {
  //  ...previousData,
  //  ...payload.dataset,
  // };
 },
 MACHINE_LOG_UPDATE(state, data) {
  let payload = _.cloneDeep(data);
  if (payload.actual_count != "")
   state.machineData.machineLog.actual_count = payload.actual_count;
  if (payload.rejected_count != "")
   state.machineData.machineLog.rejected_count = payload.rejected_count;
  if (payload.pieces_per_stroke != "")
   state.machineData.machineLog.pieces_per_stroke = payload.pieces_per_stroke;
  if (payload.emp_remarks != "")
   state.machineData.machineLog.emp_remarks = payload.emp_remarks;
 },

 MACHINE_LOGS(state, payload) {
  state.machineLogs = payload;
 },
 //  MACHINE_HISTORY(state, { payload, eTime }) {
 //   let data = payload;
 //   const { uq, machine_id } = payload;

 //   //tracking history
 //   // const mHistory = await MachineHistory.query()
 //   //   .where('uq', uq)
 //   //   .whereNull('end_time')
 //   //   .where('machine_id', machine_id)
 //   //   .orderBy('id', 'desc')
 //   //   .first();
 //   let mHistory = _.chain(state.machineData.MachineHistory)
 //    .query()
 //    .where("uq", uq)
 //    .whereNull("end_time")
 //    .where("machine_id", machine_id)
 //    .orderBy("id", "desc")
 //    .first()
 //    .value();
 //   if (mHistory) {
 //    //find duration
 //    const startTime = new Date(mHistory.start_time);
 //    const endTime = new Date(eTime);
 //    const durationInMilliseconds = endTime.getTime() - startTime.getTime();
 //    const durationInSeconds = Math.floor(durationInMilliseconds / 1000);

 //    //update end time
 //    mHistory.end_time = eTime;
 //    mHistory.duration = durationInSeconds;
 //    //   mHistory.merge({end_time:eTime,duration:durationInSeconds})
 //    //   await mHistory.save()

 //    //condition for logout
 //    if (data.operation != "force" && data.action != "stop")
 //     state.machineData.MachineHistory.push({ ...data, start_time: eTime });
 //    //   await   MachineHistory.create({...data,start_time:eTime})
 //   } else {
 //    //first time createing history
 //    state.machineData.MachineHistory.push(data);

 //    //  await MachineHistory.create(data)
 //   }

 //   // let machineDetail=await this.machineDetail(machine_id,uq);
 //   // let history = await MachineHistory.query()
 //   //   .where('uq', uq)
 //   //   .whereNotNull('end_time')
 //   //   .where('machine_id', machine_id)
 //   //   .orderBy('id', 'desc');
 //   //   return {
 //   //     machineDetail,
 //   //     history
 //   //   };
 //  },

 MACHINELOG(state, payload) {
  const { machine_id, uq } = payload;

  //   let data = payload;
  //   const { uq, machine_id } = request.body().data;
  //     const mLog = await MachineLog.query()
  //   .where('machine_id', machine_id)
  //   .where('uq', uq)
  //   .orderBy('id', 'desc')
  //   .first();
  let mLog = _.chain(state.machineData.machineHisotry)
   .query()
   .where("machine_id", machine_id)
   .where("uq", uq)
   .orderBy("id", "desc")
   .first()
   .value();
  console.log("mLog", mLog);
  if (mLog) {
   let eTime = payload.time;
   // Convert the datetime strings into JavaScript Date objects
   const startTime = new Date(mLog.start_time);
   const endTime = new Date(eTime);
   // Calculate the duration between start_time and end_time
   const durationInMilliseconds = endTime.getTime() - startTime.getTime();
   const durationInSeconds = Math.floor(durationInMilliseconds / 1000);
   mLog.end_time = eTime;
   mLog.duration = durationInSeconds;
   //      mLog.merge({end_time:eTime,duration:durationInSeconds})
   //    await mLog.save()
   mutations.MACHINE_HISTORY(state, { payload, eTime });
   //    let history=await this.MACHINE_HISTORY(request,eTime)

   //    let rtdata= await this.getLiveMachineData(request)
   //    return rtdata;
   // return history;
  } else {
   //  await MachineLog.create(data)
   state.machineData.machineHisotry.push(payload);
   //  let history=await  this.MACHINE_HISTORY(request,null)
   // console.log(history);
   // return   ctx.response.status(200).json(history)
  }
  // let rtdata= await this.getLiveMachineData(request)
  // return rtdata;
 },

 setProduct(state, payload) {
  state.setup.selected_product.id = payload.id;
  state.setup.selected_product.part_no = payload.part_no;
  state.setup.selected_product.material_code = payload.material_code;
  state.setup.selected_product.grn_no = payload.grn_no;
  state.setup.selected_product.name = payload.name;
  state.setup.selected_product.group = payload.group;
  state.setup.selected_product.other_detail = payload.other_detail;
  state.setup.selected_product.other = payload.other;
 },

 machineData(state, payload) {
  // state.machineData.machineLog = data.machineLog || {};
  //1st time insertion

  if (payload.operation != "force" && payload.action != "stop") {
   if (!state.isMachineWatcher) return;
  }

  // console.log(payload);

  //   ++++++++++++++++++++HISTORY+++++++++++++++++++++
  var data = _.cloneDeep(payload);

  var dateTime = moment(String(data.time)).format(state.setup.bgDateTimeFormat);
  var stroke = data.start_stroke;
  //--------------------LOG----------------
  let currentLogData = data;
  if (_.isEmpty(state.machineData.machineLog)) {
   //--------------machine status insert--------------
   currentLogData.start_time = dateTime;
   currentLogData.end_time = null;
   currentLogData.start_stroke = stroke;
   currentLogData.end_stroke = 0;
   currentLogData.actual_stroke = 0;

   state.machineData.machineLog = currentLogData;
  } else {
   updateMachineLog(
    state.machineData.machineLog,
    _.cloneDeep(data),
    dateTime,
    stroke
   );
  }
  console.log("Log++++++++", state.machineData.machineLog);
  //--------------------LOG----------------
  var previousData = _.find(
   state.machineData.machineHisotry,
   (o) => o.end_time === null
  );

  if (previousData) {
   updateMachineData(previousData, dateTime, stroke);
  }

  //--------------machine status insert--------------
  //time
  data.start_time = dateTime;
  data.end_time = null;
  data.start_stroke = stroke;
  data.end_stroke = 0;
  data.actual_stroke = 0;
  // data.ruq = dateTime.valueOf();
  state.machineData.machineHisotry.push(_.cloneDeep(data));

  console.log("stroke", stroke, state.machineData);
  //   ++++++++++++++++++++HISTORY+++++++++++++++++++++

  //   console.log("+++++++++++++++data+++++++++++++++++");
  //   console.log(data);
  //   data.start_stroke=null;
  //   data.end_stroke=null;
  //   data.stroke=
  // state.machineData.currentHistory = data.currentHistory || {};
 },

 //  machineData(state, data) {
 //   state.machineData.machineLog = data.machineLog || {};
 //   state.machineData.machineHisotry = data.machineHisotry || [];
 //   state.machineData.currentHistory = data.currentHistory || {};
 //  },

 setGenerateUid(state) {
  state.setup.uq = uuidv4();
 },

 setMachineStatus(state, value) {
  state.setup.checkMachine = value;
 },
 setEmbededStatus(state, value) {
  state.setup.checkEmbededDevice = value;
 },
 machineLiveData(state, value) {
  Vue.set(state.setup, "machineLiveData", value);
 },
 //  setShiftName(state, value) {
 //   Vue.set(state.setup, "shiftName", value);
 //  },

 setShift(state, value) {
  if (state.setup.autoShift) {
   Vue.set(state.setup, "selected_shift", {
    id: value.id,
    name: value.name,
    group: value.group,
    start_time: value.start_time,
    end_time: value.end_time,
   });
  }
 },

 machineHistory(state, history) {
  if (Array.isArray(history)) state.machineHistory = history;
 },
 createShift(state, payload) {
  // console.log("--shift---",payload)
  state.setup.shifts.push(payload);
 },
 setDate(state) {
  state.setup.date = moment().format("YYYY-MM-DD");
 },

 setTimeEverySecond(state) {
  state.setup.time = moment().format("hh:mm");
 },
 createCompany(state, payload) {
  state.db.companies.push(payload);
 },
 checkCompany(state, payload) {
  _.filter(
   state.db.companies,
   (x) => x.username == payload.username && payload.password
  );
 },
 createGroup(state, payload) {
  state.db.groups.push(payload);
 },
 setCompany(state, payload) {
  state.setup.company = {
   id: payload.id,
   email: payload.email,
   password: payload.password,
  };
 },
 setDialog(state, payload) {
  Vue.set(state.dialog, payload.key, payload.value);
 },

 watchMachine(state, value) {
  state.setup.watchMachine = value;
 },

 //----------------machine track-----------
 createMachineEntryParent(state, value) {
  state.setup.createMachineEntryParent = value;
 },
 machineSessionId(state, value) {
  // console.log("machine set id||||||",value)
  // state.setup.machineSessionId=value
  Vue.set(state.setup, "machineSessionId", value);
 },
 clearMachineSessionId(state) {
  Vue.set(state.setup.machineSessionId, "machine_client_id", "");
  Vue.set(state.setup.machineSessionId, "start_time", "");
  Vue.set(state.setup.machineSessionId, "end_time", "");
  Vue.set(state.setup.machineSessionId, "isClosed", "");
  Vue.set(state.setup.machineSessionId, "date", "");
 },

 // selected_machine_runned_main(state,value){

 //   state.setup.selected_machine_runned_main=value

 // },
 // selected_runned_part_no(state,value){

 //   state.setup.selected_runned_part_no=value

 // },

 createMachineEntryChild(state, value) {
  state.setup.createMachineEntryChild.push(value);
 },
 removeMainActivities(state) {
  state.setup.machineActivities = [];
 },
 machineActivities(state, value) {
  state.setup.machineActivities.push(value);
 },
 //--------------------change widget----------

 setShiftManually(state, payload) {
  state.setup.selected_shift.id = payload.id;
  state.setup.selected_shift.name = payload.name;
  state.setup.selected_shift.group = payload.group;
  state.setup.selected_shift.creator_id = payload.creator_id;
  state.setup.selected_shift.creator_role = payload.creator_role;
  state.setup.selected_shift.start_time = payload.start_time;
  state.setup.selected_shift.end_time = payload.end_time;
 },
 GET_PRODUCTS(state, payload) {
  // console.log("set Products",payload,Array.isArray(payload))
  if (Array.isArray(payload)) Vue.set(state.db, "products", payload);
 },
 SET_EMPLOYEE(state, payload) {
  if (_.isEmpty(payload)) return;
  state.setup.selected_employee.id = payload.id; //
  state.setup.selected_employee.branch = payload.branch; //
  state.setup.selected_employee.company_id = payload.company_id; //
  state.setup.selected_employee.name = payload.name; //
  state.setup.selected_employee.password = payload.password; //
  state.setup.selected_employee.email = payload.email; //
  state.setup.selected_employee.role = payload.role; //
  state.setup.selected_employee.phone = payload.phone; //
  state.setup.selected_employee.id_card = payload.id_card;
  state.setup.selected_employee.other = payload.other; //
 },
 CLEAR_EMPLOYEE(state, payload) {
  if (_.isEmpty(payload)) return;
  state.setup.selected_employee.id = "";
  state.setup.selected_employee.branch = "";
  state.setup.selected_employee.company_id = ""; //
  state.setup.selected_employee.name = "";
  state.setup.selected_employee.password = "";
  state.setup.selected_employee.email = "";
  state.setup.selected_employee.role = "";
  state.setup.selected_employee.phone = "";
  state.setup.selected_employee.id_card = "";
  state.setup.selected_employee.other = "";
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
 SET_MACHINE(state, data) {
  if (_.isEmpty(data)) return;
  state.setup.selected_machine.id = data.id;
  state.setup.selected_machine.code = data.code;
  state.setup.selected_machine.branch = data.branch;
  state.setup.selected_machine.name = data.name;
  state.setup.selected_machine.group = data.group;
  state.setup.selected_machine.hours = data.hours;
  state.setup.selected_machine.detail = data.detail;
  state.setup.selected_machine.description = data.description;
  state.setup.selected_machine.other = data.other;
 },

 //  MACHINE_LOGOUT(state) {
 //   state.setup.selected_machine.id = "";
 //   state.setup.selected_machine.code = "";
 //   state.setup.selected_machine.branch = "";
 //   state.setup.selected_machine.name = "";
 //   state.setup.selected_machine.group = "";
 //   state.setup.selected_machine.hours = "";
 //   state.setup.selected_machine.detail = "";
 //   state.setup.selected_machine.description = "";
 //   state.setup.selected_machine.other = "";
 //  },
 CLEAR_COMPANY(state) {
  state.setup.selected_company.id = "";
  state.setup.selected_company.name = "";
  state.setup.selected_company.email = "";
 },

 SET_COMPANY(state, data) {
  if (_.isEmpty(data)) return;
  state.setup.selected_company.id = data.id;
  state.setup.selected_company.name = data.name;
  state.setup.selected_company.email = data.email;
 },
 SET_SHIFT(state, data) {
  if (_.isEmpty(data)) return;
  state.db.shifts = data;
 },
 SET_DOWNTIME(state, data) {
  if (_.isEmpty(data)) return;
  state.db.down_time = data;
 },
 SET_BREAK(state, data) {
  if (_.isEmpty(data)) return;
  state.db.breaks = data;
 },

 LOCAL_SK_IO_MACHINE_PART_NO(state, payload) {
  Vue.set(state.global, "LOCAL_SK_IO_MACHINE_PART_NO", payload);
 },
 runned(state, value) {
  state.runned.MACHINE_RUNNED_MAIN = value.MACHINE_RUNNED_MAIN;
  state.runned.MACHINE_RUNNED_PART_NO = value.MACHINE_RUNNED_PART_NO;
  state.runned.MACHINE_RUNNED_ACTIVITY = value.MACHINE_RUNNED_ACTIVITY;
 },
 MACHINE_RUNNED_MAIN(state, payload) {
  //  console.log("MACHINE_RUNNED_MAIN++",payload)
  Vue.set(state.runned, "MACHINE_RUNNED_MAIN", payload);
 },
 GET_MACHINE_RUNNING_PART_NO(state, payload) {
  //console.log(payload)
  Vue.set(state.running, "MACHINE_RUNNING_PART_NO", payload);
 },
 GET_MACHINE_RUNNING_MAIN(state, payload) {
  // console.log(payload)
  Vue.set(state.running, "MACHINE_RUNNING_MAIN", payload);
 },
 GET_MACHINE_RUNNING_ACTIVITY(state, payload) {
  Vue.set(state.running, "MACHINE_RUNNING_ACTIVITY", payload);
 },
 SET_SHEDULE(state, payload) {
  Vue.set(state.db, "shedule", payload);
 },
};

export default mutations;
