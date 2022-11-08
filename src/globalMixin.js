import Vue from 'vue'
import moment from 'moment'
import _ from 'lodash'

Vue.mixin({
    computed:{
globalRunningProducts(){
var $vm=this;
return _.uniq(_.map($vm.$store.state.setup.machineActivities, 'product_id'))
},
globalRunningShifts(){
    var $vm=this;
    return _.uniq(_.map($vm.$store.state.setup.machineActivities, 'shift_id'))
    },
    globalRunningEmps(){
        var $vm=this;
        return _.uniq(_.map($vm.$store.state.setup.machineActivities, 'emp_id'))
    
    },    
    globalRunningOn(){
        var $vm=this;
        return _.filter($vm.$store.state.setup.machineActivities, (x)=>x.machine_active_status=='ON')
    
    },    
    globalRunningOff(){
        var $vm=this;
        return _.filter($vm.$store.state.setup.machineActivities, (x)=>x.machine_active_status=='OFF')
    
    },    
    globalPlannedStops(){
        var $vm=this;
        return _.filter($vm.$store.state.setup.machineActivities, (x)=>x.break_type=='PLANNED'&&x.machine_active_status=='OFF')
    
    },    
    globalUnPlannedStops(){
        var $vm=this;
        return _.filter($vm.$store.state.setup.machineActivities, (x)=>x.break_type=='UNPLANNED'&&x.machine_active_status=='OFF')
    
    },    
    globalMaxStroke(){
        var $vm=this;
        if($vm.$store.state.setup.machineActivities.length!=0){
        var result= _.maxBy($vm.$store.state.setup.machineActivities, (x)=>x.stroke)
    return {
        result:true,
        find:result,
        stroke:result.stroke
    }
    }
    return{
            result:false,
            find:{},
            stroke:0
        
    };

    },    
   
      guiTimeFormat(){
  var $vm=this;
    return (value)=> {
    console.log("currentTime",value)
   return moment(String(value),$vm.$store.state.setup.bgTimeFormat).format($vm.$store.state.setup.uiTimeFormat)}
        },
      guiDateFormat(){
  var $vm=this;
   return (value)=> {
    return moment(String(value),$vm.$store.state.setup.bgDateFormat).format($vm.$store.state.setup.uiDateFormat)}
  
      },
      //------------------mixin------
      globalBtnBgColor(){

       return  this.$store.state.style.btnBgColor;
    },
    globalStyle(){

        return 'color:'+this.$store.state.style.btnTxtColor;
    }


    }
    
  })
  
  
