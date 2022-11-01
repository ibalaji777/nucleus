import moment from "moment/moment";

const state={

    dialog:{
operatorLoginDialog:false,
selectEmployeeWidget:false,

    },
db:{
    employee:[
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

    }
],
shifts:[
    {
        id:1,
        name:'Shift A',
        creator_id:1, 
        creator_role:'',//supervisor or company
        branch:'',
        hours:8,
        start_time:'',
        end_time:''
    },
    {
        id:1,
        name:'Shift B',
        creator_id:1, 
        creator_role:'',//supervisor or company
        branch:'',
        hours:8,
        start_time:'',
        end_time:''
    },
    {
        id:1,
        name:'Shift C',
        creator_id:1, 
        creator_role:'',//supervisor or company
        branch:'',
        hours:8,
        start_time:'',
        end_time:''
    }
],

    companies:[{
id:1,
name:'interplex',
username:'inter',
password:'inter',
phone:'',
dialcode:'',
email:'',


    }],

},
setup:{
    time:moment().format("hh:mm s"),
date:moment().format("HH:MM S"),
shift:'a',

    checkMachine:false,
    logged:{
        id:'',
        name:'',
        email:'',
        phone:'',
        gender:'',
        idcard:'',
        other:'',
        group:'',
    },
    selected_shift:{
     id:'',
     name:'',
     hour:'',
     group:'',
    },
    selected_machine:{
        id:'',
        name:'',
        detail:'',
        group:'',
    },
    selected_part_no:{
        id:'',
        name:'',
        production_perStroke:1,
        group:'',
        other_detail:'',


    },
    company:{
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