<template>
    <div>
        <v-dialog v-model="$store.state.dialog.demoMachineDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="$store.commit('setDialog',{key:'demoMachineDialog',value:false})">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Demo Machine</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items> </v-toolbar-items>
                </v-toolbar>
                <div style="padding: 10px;">

<div style="display:flex;justify-content:space-even">
<v-btn dark color="primary"   @click="$store.commit('setDialog',{key:'isDemoPlugin',value:!$store.state.dialog.isDemoPlugin})">

Plugin  
<div  v-if="$store.state.dialog.isDemoPlugin">
off
</div>
<div v-else>On</div>
</v-btn>

<v-btn dark color="primary" @click="switchMachine">
machine
<div  v-if="machine">
off
</div>
<div v-else>On</div>

</v-btn>

<v-btn dark color="primary" @click="clear">
Clear
</v-btn>

</div>
<br>
<div>
    <pre>
{{machineLogs}}
</pre>
</div>

                </div>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>


export default {
data(){
    return{

machineLogs:{},

stroke:0,
rpm:"",
machine:false,
inputState:false
    }
},    
methods:{
clear(){
this.stroke=0,
this.rpm="",
this.machine=false,
this.inputState=false

},
switchMachine(){
this.machine=!this.machine;
this.inputState=!this.inputState;


},
},
    mounted(){
var $vm=this;
setInterval(()=>{
    console.log("timeline",$vm.$store.state.dialog.isDemoPlugin)
    if($vm.$store.state.dialog.isDemoPlugin)
{
//machine in continues mode and signal
$vm.$store.commit('setMachineStatus',$vm.machine)
//serial port started read
$vm.$store.commit('setEmbededStatus',$vm.machine)
//live data from machine 
var check={stroke:$vm.stroke,rpm:$vm.rpm,machine:$vm.machine,inputState:$vm.inputState}
$vm.$store.commit('machineLiveData',check)
console.log("embeded",check)
$vm.machineLogs=check
$vm.stroke++;
}
},1000)

    }
}
</script>
<style lang="scss">
    
</style>