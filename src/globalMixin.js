import Vue from 'vue'
import moment from 'moment'


Vue.mixin({
    computed:{
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
  
      }
    }
    
  })
  
  
