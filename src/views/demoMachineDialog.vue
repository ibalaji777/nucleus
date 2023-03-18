<template>
    <div>
    
    </div>
</template>
<script>


export default {
data(){
    return{

shedule:[
    {
        id:1,
        name:'Tool setting',
        description:'',
        tme:"30"
    },
    {
        id:2,
        name:'Tool setting 2',
        description:'',
        time:"30"
    }
],
machineLogs:{},

stroke:0,
rpm:"",
machine:false,
inputState:false
    }
},    
methods:{
    SheduleOperation(){

    },
clear(){
this.stroke=0,
this.rpm="",
this.machine=false,
this.inputState=false

},
remove(){
var $vm=this;
$vm.$store.commit('removeMainActivity')

},
switchMachine(){
this.machine=!this.machine;
this.inputState=!this.inputState;


},
},
    mounted(){
var $vm=this;
setInterval(()=>{
    // console.log("timeline",$vm.$store.state.dialog.isDemoPlugin)
    if($vm.$store.state.dialog.isDemoPlugin)
{
//machine in continues mode and signal
$vm.$store.commit('setMachineStatus',$vm.machine)
//serial port started read
$vm.$store.commit('setEmbededStatus',$vm.machine)
//live data from machine 
var check={stroke:$vm.stroke,rpm:$vm.rpm,machine:$vm.machine,inputState:$vm.inputState}
$vm.$store.commit('machineLiveData',check)
// console.log("embeded",check)
$vm.machineLogs=check
$vm.stroke=parseFloat($vm.stroke||0)+1;
}
},1000)

    }
}
</script>
<style lang="scss">
    .demoMachinTable{
     width: 100%;
    height: 500px;
    overflow: scroll;
    border-collapse: collapse;
    }
    .demoMachinTable tr,td{
        border:1px solid black;
        padding:10px;
    }
        .demoMachinTable tr:nth-child(odd){
            background: lightblue;
        }
        .demoMachinTable tr:nth-child(even){
            background: grey;
        }

</style>