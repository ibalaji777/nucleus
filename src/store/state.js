import moment from "moment/moment";

const state={


    dialog:{
operatorLoginDialog:false,
selectEmployeeWidget:false,

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

//ok-----
shifts:[
    {
        id:1,
        company_id:1,
        name:'Shift A',
        creator_id:1, 
        creator_role:'',//supervisor or company
        group:'',
        start_time:'',
        end_time:''
    },
    {
        id:2,
        company_id:1,
        name:'Shift B',
        creator_id:1, 
        creator_role:'',//supervisor or company
        group:'',
        start_time:'',
        end_time:''
    },
    {
        id:3,
        company_id:1,
        name:'Shift C',
        creator_id:1, 
        creator_role:'',//supervisor or company
        group:'',
        hours:8,
        start_time:'',
        end_time:''
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
        username:'op',
        password:'op',
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
        groupe:'',
        discription:'shift A',
        start_time:moment().format('hh:mm:ss'),
        end_time:moment() .add(15, 'minutes').format('hh:mm:ss')//.add(15,'minutes'),
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
    
// machine_track:,

runningMachine:[
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
],


runningMachineEntries:[
{  
id:'',
company_id:1,
//
running_machine_id:1,
running_ref_id:'111',
machine_id:1,
//reason
status:'started',//started/stopped
msg:'',//custom stopping  part no insert or change,oil change,powercut
reason:'',//unplaneed or planned 
//date
machine_end_date:'',//date with time


//employee detail
emp_id:'',
emp_id_card:'',
emp_id_name:'',
shift:'a',
//running part no
part_no_id:'',
part_no:'',

}
],

machine:[
    {
        id:1,
        company_id:1,
        creator_id:1, 
        creator_role:'',//supervisor or company
        group:'general',
        branch:'',
        name:'a1',
        description:'',
        other:'',
        hours:8,

        //importent
        // shifts:[],
        products:[
            {
                id:1,
                product_id:1,
                productionPerStroke:1,
            }
        ],

        //importent
        // breaks:[
        //     {
        //         id:1,
        //         name:'teak break',
        //         discription:'shift A',
        //         start_time:moment().format('hh:mm:ss'),
        //         end_time:moment() .add(15, 'minutes').format('hh:mm:ss')//.add(15,'minutes'),
        //     }
        // ]


    }
],



},
setup:{
watchMachine:false,
machineLiveData:{},
time:moment().format("hh:mm s"),
date:moment().format("dddd"),
// -------using shift------------------------
selected_shift:{
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
checkEmbededDevice:false,
    checkMachine:false,
  selected_employee:
    {
        id:1,
        branch:'',
        company_id:1,
        creator_id:1, 
        creator_role:'',//supervisor or company
        name:'sathish',
        username:'op',
        password:'op',
        email:'',
        role:'',//superviser or operator
        phone:'',
        id_card:'',
        other:'',

    },
  
    selected_machine:{
        id:'',
        name:'',
        detail:'',
        group:'',
    },
    selected_product:{
        id:'',
        part_no:'',
        rmcode:'',
        material_no:'',
        grn_no:'',
        name:'',
        // production_perStroke:1,//
        group:'',
        other_detail:'',
        other:{}


    },
    selected_company:{
        id:'',
        email:'',
        password:''

    },

    shifts:[],
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