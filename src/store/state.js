import moment from "moment/moment";
import { v4 as uuidv4 } from "uuid";
const state = {
 login: {
  username: "",
  password: "",
 },
 isMachineWatcher: false,
 machineLogs: [],

 defaultData: {
  machine_status_on: "ON",
  machine_status_off: "OFF",
  operation_break: "break",
  operation_shedule: "shedule",
  operation_machine: "signal",
  operation_downtime: "downtime",

  machine_status_on_msg: "Machine Running",
  machine_status_off_msg: "Machine Running",
 },

 machineOeeInfo: {
  atcual_count: 0,
  rejected_count: 0,
  pieces_per_min: 0,
 },
 machineData: {
  machineLog: {},
  machineHisotry: [],
  currentHistory: {
   //force ->first time start
   //force ->Logout time start
   //break and downtime only a marker like a reasoner
   //sheduler list of options
   //signal ->actual machine running/stopped
   operation: "", //signal/shedule/break/downtime/force
   op_id: 0, //signal/shedule/break/downtime/force their id
   op_name: "", //signal/shedule/break/downtime/force their name
   op_desc: "", //signal/shedule/break/downtime/force their desc
   op_min: "", //signal/shedule/break/downtime/force their min
   uq: "",
   time: new Date(),
   product_id: "",
   machine_id: "",
   emp_id: "",
   shift: "",
   type: "", //manual or automatic
   action: "", //start or stop
   reason: "", //message
   machine_status: "",
   //new-------
   stroke: "",
   //new
   message: "",
   // shedule_id:0,
   // shedule_pmin:0,
   remarks: "",
  },
 },

 machineHistory: [],

 dialog: {
  deviceDialog: false,
  errorsDialog: false,
  editLogsDialog: false,
  logsDialog: false,
  oeeSetupDialog: false,
  machineActionDialog: false,
  loadMaterialDialog: false,
  machineWidgetDialog: false,
  empLoginWidgetDialog: false,
  shiftWidgetDialog: false,
  productWidgetDialog: false,
  demoMachineDialog: false,
  selectMachineDialog: false,
  operatorLoginDialog: false,
  selectEmployeeWidget: false,
  selectProductDialog: false,
  isDemoPlugin: false,
  historyDialog: false,
  closeShiftDialog: false,
 },
 runned: {
  MACHINE_RUNNED_MAIN: [],
  MACHINE_RUNNED_PART_NO: [],
  MACHINE_RUNNED_ACTIVITY: [],
 },
 running: {
  MACHINE_RUNNING_MAIN: [],
  MACHINE_RUNNING_PART_NO: [],
  MACHINE_RUNNING_ACTIVITY: [],
 },
 style: {
  btnBgColor: "primary",
  btnTxtColor: "white",
 },
 global: {
  LOCAL_SK_IO_MACHINE_PART_NO: [],
 },
 db: {
  shedule: [
   {
    name: "a1",
    description: "a1",
    minutues: 15,
   },
   {
    name: "a2",
    description: "a2",
    minutues: 15,
   },
   {
    name: "a3",
    description: "a3",
    minutues: 15,
   },
  ],
  //ok----
  products: [
   // {
   //     id: 1,
   //     company_id: '',
   //     branch: '',
   //     part_no: '11',
   //     material_code: '11',
   //     grn_no: '11',
   //     name: 'sample 1',
   //     group: '',
   //     other_detail: '',
   //     other: {}
   // },
   // {
   //     id: 2,
   //     part_no: '12',
   //     branch: '',
   //     material_code: '12',
   //     grn_no: '12',
   //     name: 'sample 12',
   //     group: '',
   //     other_detail: '',
   //     other: {}
   // }
  ],
  //ok---------
  down_time: [
   // {
   //     id: 1,
   //     company_id: 1,
   //     name: 'Hardware Fixing',
   //     description: '',
   //     group: '',
   //     type: 'break'//if you take break
   // }
  ],
  //ok--------
  breaks: [
   // {
   //     id: 1,
   //     name: 'teak break',
   //     type: 'PLANNED',//PLANNED/UNLPLANNED<---this wrong
   //     groupe: '',
   //     discription: 'shift A',
   //     start_time: moment().add(50, 'minutes').format('HH:mm'),
   //     end_time: moment().add(66, 'minutes').format('HH:mm')//.add(15,'minutes'),
   // }
  ],
  //ok-----
  shifts: [
   // {
   //     id: 1,
   //     company_id: 1,
   //     name: 'Shift A',
   //     group: '',
   //     start_time: moment().format('HH:mm'),
   //     end_time: moment().add(8, 'hours').format('HH:mm'),
   // },
  ],
  //OK
  branches: [
   {
    id: 1,
    name: "Chennai",
   },
   {
    id: 2,
    name: "Bangalore",
   },
  ],
  //ok-------
  employee: [
   {
    id: 1,
    group: "",
    company_id: 1,
    creator_id: 1,
    creator_role: "", //supervisor or company
    name: "sathish",
    branch: "", //ok
    username: "op",
    password: "op",
    email: "",
    role: "", //superviser or operator
    phone: "",
    id_card: "",
    other: "",
   },
   {
    id: 1,
    group: "",
    company_id: 1,
    creator_id: 1,
    creator_role: "", //supervisor or company
    name: "sathish",
    branch: "", //ok
    username: "op1",
    password: "op1",
    email: "",
    role: "", //superviser or operator
    phone: "",
    id_card: "",
    other: "",
   },
  ],

  //ok-----
  companies: [
   {
    id: 1,
    name: "interplex",
    username: "inter",
    password: "inter",
    phone: "",
    dialcode: "",
    email: "",
    address: "",
   },
  ],
  //ok-----
  product_wise_stroke: [
   {
    id: 1,
    product_id: 1,
    machine_id: 1, //machine id for group
    productionPerStroke: 1,
   },
  ],
  //ok-----
  machines: [
   {
    id: 1,
    company_id: 1,
    // creator_id:1,
    // creator_role:'',//supervisor or company
    // group:'',
    branch: "",
    hours: 8,
    name: "a1",
    description: "",
    other: "",
   },
  ],

  // machine_track:,

  // runningMachine:[
  // {
  //     id:1,
  //     company_id:1,
  //     ref_id:'111',
  //     machine_id:1,
  //     part_no_id:'',
  //     part_no:'',
  //     active_status:'',//ON/OFF
  //    // status:'started',//started/stopped
  //     //msg:'',//custom stopping  part no insert or change,oil change,powercut
  //     break_type:'',//NONE,PLANNED or UNPLANNED ,
  //     break_reason:'',
  //     remarks:'',
  // //employee detail
  // emp_id:'',
  // emp_id_card:'',
  // emp_id_name:'',
  // shift:'a',

  //     //computation-----------
  //     totalStroke:5,
  //     production_count_per_stroke:0,
  //     production_count_per_stroke2:0,
  //     production_count_type:'production_count_per_stroke',//production_count_per_stroke
  // //date
  // machine_start_date:'',//date with time
  // machine_end_date:'',//date with time

  // }
  // ],

  // runningMachineEntries:[
  // {
  // id:'',
  // company_id:1,
  // //
  // running_machine_id:1,
  // running_ref_id:'111',
  // machine_id:1,
  // //reason
  // status:'started',//started/stopped
  // msg:'',//custom stopping  part no insert or change,oil change,powercut
  // reason:'',//unplaneed or planned
  // //date
  // machine_end_date:'',//date with time

  // //employee detail
  // emp_id:'',
  // emp_id_card:'',
  // emp_id_name:'',
  // shift:'a',
  // //running part no
  // part_no_id:'',
  // part_no:'',

  // }
  // ],
 },
 setup: {
  uq: uuidv4(),
  shiftName: "",
  time: moment().format("HH:mm"),
  date: moment().format("YYYY-MM-DD"),
  uiTimeFormat: "hh:mm:ss a",
  bgTimeFormat: "HH:mm",
  uiDateFormat: "DD-MM-YYYY",
  bgDateFormat: "YYYY-MM-DD",
  bgDateTimeFormat: "YYYY-MM-DD HH:mm:ss",
  machineSessionId: {
   machine_client_id: "", //ok random
   start_time: "", //must
   end_time: "", //must
   isClosed: false,
   date: "",
  },
  machineActivities: [],
  createMachineEntryParent: {},
  createMachineEntryChild: [],

  autoShift: true,
  watchMachine: false,
  machineLiveData: {
   rpm: "",
   stroke: 0,
   machine: false,
   inputStatus: false,
  },
  checkEmbededDevice: false,
  checkMachine: false,
  //ok
  // runned:{
  //     machine_runned_main:[],
  //     //ok used select and edit update
  //     selected_runned_part_no:[],

  // },
  // selected_machine_runned_main:[],
  // //ok used select and edit update
  // selected_runned_part_no:[],
  //ok
  selected_branch: {
   id: 1,
   name: "Chennai",
  },
  //ok
  selected_group: "",
  //ok
  selected_breaks: {
   id: 1,
   name: "Shift A",
   creator_id: 1,
   group: "",
   creator_role: "", //supervisor or company
   branch: "",
   start_time: "",
   end_time: "",
  },
  // -------using shift------------------------
  selected_shift: {
   id: 1,
   name: "Shift A",
   creator_id: 1,
   group: "",
   creator_role: "", //supervisor or company
   start_time: "",
   end_time: "",
  },

  // -------using shift------------------------
  selected_employee: {
   id: 1,
   branch: "chennai",
   company_id: 1,
   creator_id: 1, //remove
   creator_role: "", //supervisor or company//reomove
   name: "sathish",
   username: "op", //REMOVE
   password: "op",
   dialcode: "",
   email: "sathis@gmail.com",
   role: "operator", //superviser or operator
   phone: "88888888",
   id_card: "12345",
   other: "",
  },

  selected_machine: {
   // id: 1,
   // code: 'ia11',
   // branch: '',//ok
   // name: 'm1',
   // group: '',
   // hours: 8,
   // detail: 'some',
   // description: '',
   // other: '',
  },
  selected_product: {
   id: 1,
   part_no: "11",
   // rmcode:'11a',
   material_code: "11",
   // grn_no:'11',
   name: "sample",
   description: "",
   // production_perStroke:1,//
   group: "",
   other_detail: "",
   other: {},
  },
  selected_company: {
   id: "",
   name: "",
   email: "",
  },

  format: {
   time: "hh:mm:ss a",
   date: "YYYY-MM-DD",
  },

  machine: {
   eventSignal: "",
   eventCount: "",
   eventRpm: "",
  },
  user: {
   id: 1,
   branch: "Chennai",
   company_id: 1,
   creator_id: 1,
   creator_role: "", //supervisor or company
   name: "sathish",
   username: "op",
   password: "op",
   email: "sathish@gmail.com",
   role: "operator", //superviser or operator
   phone: "888888888",
   id_card: "1111",
   other: "",
  },
 },
 currentShift: {}, //shift obj

 bgColor: {
  oee: "#e64f21",
  quality: "#28ba7a",
  performance: "#267aa3",
  availability: "#f1bf25",
 },
};

export default state;
