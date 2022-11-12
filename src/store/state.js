import moment from "moment/moment";

const state={


    dialog:{
        machineWidgetDialog:false,
        empLoginWidgetDialog:false,
        shiftWidgetDialog:false,
        productWidgetDialog:false,
        demoMachineDialog:false,

        selectMachineDialog:false,
operatorLoginDialog:false,
selectEmployeeWidget:false,
selectProductDialog:false,
isDemoPlugin:false,

    },
style:{
btnBgColor:'primary',
btnTxtColor:'white',

},
global:{
LOCAL_SK_IO_MACHINE_PART_NO:[]
},
db:{

// default:{
//     id:1,
//     branch:'',
//     company_id:1,
//     config:{
//         plannedTime:8,
//         shifts:[  {
//             id:1,
//             name:'Shift A',
//             creator_id:1, 
//             group:'',
//             creator_role:'',//supervisor or company
//             branch:'',
//             start_time:'',
//             end_time:''
//         },
//         {
//             id:1,
//             name:'Shift B',
//             creator_id:1, 
//             creator_role:'',//supervisor or company
//             branch:'',
//             group:'',
//             start_time:'',
//             end_time:''
//         },
//         {
//             id:1,
//             name:'Shift C',
//             creator_id:1, 
//             creator_role:'',//supervisor or company
//             branch:'',
//             group:'',
//             start_time:'',
//             end_time:''
//         }],
  
//     },
// },
// breaks:[

// ],
//ok----
products:[
    {
        id:1,
        company_id:'',
        branch:'',
        part_no:'11',
        material_code:'11',
        grn_no:'11',
        name:'sample 1',
        group:'',
        other_detail:'',
        other:{}
    },
    {
        id:2,
        part_no:'12',
        branch:'',
        material_code:'12',
        grn_no:'12',
        name:'sample 12',
        group:'',
        other_detail:'',
        other:{}
    }
],

//ok-----
shifts:[
    {
        id:1,
        company_id:1,
        name:'Shift A',
        creator_id:1, 
        creator_role:'',//supervisor or company
        group:'',
        start_time:moment().format('HH:mm'),
        end_time:moment().add(8,'hours').format('HH:mm'),
    },
    {
        id:2,
        company_id:1,
        name:'Shift B',
        creator_id:1, 
        creator_role:'',//supervisor or company
        group:'',
        start_time:moment().add(8,'hours')
        .format('HH:mm'),
        end_time:moment().add(16,'hours').format('HH:mm'),
    },
    {
        id:3,
        company_id:1,
        name:'Shift C',
        creator_id:1, 
        creator_role:'',//supervisor or company
        group:'',
        start_time:moment().add(16,'hours')
        .format('HH:mm'),
        end_time:moment().add(24,'hours').format('HH:mm'),

    }
],
//OK
branches:[
    {
        id:1,
        name:'Chennai'
    },
    {
        id:2,
        name:'Bangalore'
    }
],
//ok-------
employee:[
    {
        id:1,
        group:'',
        company_id:1,
        creator_id:1, 
        creator_role:'',//supervisor or company
        name:'sathish',
        branch:'',//ok
        username:'op',
        password:'op',
        email:'',
        role:'',//superviser or operator
        phone:'',
        id_card:'',
        other:'',

    },
    {
        id:1,
        group:'',
        company_id:1,
        creator_id:1, 
        creator_role:'',//supervisor or company
        name:'sathish',
        branch:'',//ok
        username:'op1',
        password:'op1',
        email:'',
        role:'',//superviser or operator
        phone:'',
        id_card:'',
        other:'',

    },


],
//ok--------
breaks:[
    {
        id:1,
        name:'teak break',
        type:'PLANNED',//PLANNED/UNLPLANNED
        groupe:'',
        discription:'shift A',
        start_time:moment().add(50, 'minutes').format('HH:mm'),
        end_time:moment() .add(66, 'minutes').format('HH:mm')//.add(15,'minutes'),
    }
],
//ok-----
companies:[{
    id:1,
    name:'interplex',
    username:'inter',
    password:'inter',
    phone:'',
    dialcode:'',
    email:'',
    address:'',
    
    
    
        }],
//ok-----    
 product_wise_stroke:[
            {
                id:1,
                product_id:1,
                machine_id:1,//machine id for group
                productionPerStroke:1,
            }
        ],
//ok-----        
        machines:[
            {
                id:1,
                company_id:1,
                creator_id:1, 
                creator_role:'',//supervisor or company
                group:'',
                branch:'',
                hours:8,
                name:'a1',
                description:'',
                other:'',
            }
        ],
//ok---------
down_time:[
    {
        id:1,
        company_id:1,
        name:'Hardware Fixing',
        description:'',
        group:'',
        type:'break'


    }
]        
        

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
setup:{

time:moment().format("HH:mm"),
date:moment().format("YYYY-MM-DD"),
uiTimeFormat:"hh:mm a",
bgTimeFormat:"HH:mm",
uiDateFormat:"DD-MM-YYYY",
bgDateFormat:"YYYY-MM-DD",
machineSessionId:{},
machineActivities:[],
createMachineEntryParent:{},
createMachineEntryChild:[],

autoShift:true,
watchMachine:false,
machineLiveData:{
    rpm:'',
    stroke:0,
    machine:false,
    inputStatus:false,
},
checkEmbededDevice:false,
checkMachine:false,

//ok
selected_branch:{
    id:1,
    name:'Chennai'
},
//ok
selected_group:'',
//ok
selected_breaks:{
    id:1,
    name:'Shift A',
    creator_id:1, 
    group:'',
    creator_role:'',//supervisor or company
    branch:'',
    start_time:'',
    end_time:''
},
// -------using shift------------------------
selected_shift:{
    id:1,
    name:'Shift A',
    creator_id:1, 
    group:'',
    creator_role:'',//supervisor or company
    start_time:'',
    end_time:''


},

// -------using shift------------------------
  selected_employee:
    {
        id:1,
        branch:'chennai',
        company_id:1,
        creator_id:1, 
        creator_role:'',//supervisor or company
        name:'sathish',
        username:'op',
        password:'op',
        email:'sathis@gmail.com',
        role:'operator',//superviser or operator
        phone:'88888888',
        id_card:'12345',
        other:'',

    },
  
    selected_machine:{
        id:1,
        name:'m1',
        code:'ia11',
        detail:'some',
        group:'',
        company_id:1,
        creator_id:1, 
        creator_role:'',//supervisor or company
        branch:'',//ok
        hours:8,
        description:'',
        other:'',
    },
    selected_product:{
        id:1,
        part_no:'11',
        // rmcode:'11a',
        material_code:'11',
        grn_no:'11',
        name:'sample',
        // production_perStroke:1,//
        group:'',
        other_detail:'',
        other:{}


    },
    selected_company:{
        id:1,
        email:'test@gmail.com',
        password:'test'

    },


format:{
    time:"hh:mm:ss a",
    date:'YYYY-MM-DD'
},


machine:{
    eventSignal:'',
    eventCount:'',
    eventRpm:''

},
user:{
    id:1,
    branch:'Chennai',
    company_id:1,
    creator_id:1, 
    creator_role:'',//supervisor or company
    name:'sathish',
    username:'op',
    password:'op',
    email:'sathish@gmail.com',
    role:'operator',//superviser or operator
    phone:'888888888',
    id_card:'1111',
    other:'',
    },
},
    currentShift:{
   
    },//shift obj
  
    bgColor:{
        oee:'#e64f21',
        quality:'#28ba7a',
        performance:'#267aa3',
        availability:'#f1bf25'
    }

}


export default state;