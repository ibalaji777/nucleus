import moment from "moment/moment";

const state={

db:{
    companies:[]



},



setup:{

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


time:moment().format("HH:MM S"),
date:moment().format("HH:MM S"),
shift:'a',
machine:{
    eventSignal:'',
    eventCount:'',
    eventRpm:''

},
user:{
    name:'',
    userUq:'111'
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