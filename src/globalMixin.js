import Vue from 'vue'
import moment from 'moment'
import _ from 'lodash'

Vue.mixin({
    computed:{

        globalMachineLive(){

  return  this.$store.state.setup.machineLiveData
},

globalRunningProducts(){
var $vm=this;
var datasets=_.uniq(_.map($vm.$store.state.setup.machineActivities, 'product_id'))
return {
count:datasets.length,
datasets
}
},
globalRunningShifts(){
    var $vm=this;
var datasets= _.uniq(_.map($vm.$store.state.setup.machineActivities, 'shift_id'))
    return {
        count:datasets.length,
        datasets
   
    }
    },
    globalRunningEmps(){
        var $vm=this;
        var datasets=_.uniq(_.map($vm.$store.state.setup.machineActivities, 'emp_id'));
        return {
            count:datasets.length,
            datasets
        }
    
    },    
    globalRunningOn(){
        var $vm=this;
var datasets= _.filter($vm.$store.state.setup.machineActivities, (x)=>x.machine_active_status=='ON')
        return{
            count:datasets.count,
            datasets
        } 
    
    },    
    globalRunningOff(){
        var $vm=this;
var datasets= _.filter($vm.$store.state.setup.machineActivities, (x)=>x.machine_active_status=='OFF')
        return{
            count:datasets.length,
            datasets
        } 
    
    },    
    globalPlannedStops(){
        var $vm=this;

    var datasets= _.filter($vm.$store.state.setup.machineActivities, (x)=>x.break_type=='PLANNED'&&x.machine_active_status=='OFF')
    return{
       count:datasets.length,
       datasets
    }
    },    
    globalUnPlannedStops(){
        var $vm=this;
    var datasets= _.filter($vm.$store.state.setup.machineActivities, (x)=>x.break_type=='UNPLANNED'&&x.machine_active_status=='OFF')
    return{
        count:datasets.length,
        datasets
    }
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
  
  
