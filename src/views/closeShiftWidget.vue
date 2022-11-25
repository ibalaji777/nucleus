<template>
<div  style="background:white">
<!-- eslint-disable -->
<v-dialog
fullscreen
v-model="$store.state.dialog.closeShiftDialog">
<v-card>
    <v-toolbar
dark
color="primary"
>
<v-toolbar-title>Close Shift</v-toolbar-title>
<v-spacer></v-spacer>
<v-btn
icon
dark
@click="$store.commit('setDialog',{key:'closeShiftDialog',value:false})"
>
<v-icon>mdi-close</v-icon>
</v-btn>

<v-toolbar-items>
</v-toolbar-items>
</v-toolbar>
<div style="height:400px;background:white;padding:10px;margin:5px"> 
<!-- {{$store.state.runned}} -->
<h4 style="text-align:center">MACHINE RUNNING PRODUCTS</h4>
    <v-data-table
      :headers="headerRunningPartNo"
      :items="MACHINE_RUNNED_PART_NO"
      :search="search"
    >

     <template v-slot:item.total_count="{ item }">
<v-text-field type="number" v-model="item.total_count"></v-text-field>
 </template>
     <template v-slot:item.good_count="{ item }">
<v-text-field type="number" v-model="item.good_count"></v-text-field>
 </template>
     <template v-slot:item.reject_count="{ item }">
<v-text-field type="number" v-model="item.reject_count"></v-text-field>
 </template>
     <template v-slot:item.ideal_cyle="{ item }">
<v-text-field type="number" v-model="item.ideal_cyle"></v-text-field>
 </template>


     <template v-slot:item.machine_date="{ item }">
    <span>{{ item.machine_date | global_date_format }}</span>
 </template>
 <template v-slot:item.machine_time="{ item }">
    <span>{{ item.machine_time | global_time_format }}</span>
 </template>
 

    </v-data-table>


    <v-btn @click="submit">CLOSE SHIFT</v-btn>

</div>
 </v-card>
</v-dialog>
</div>
</template>
<script>
/*eslint-disable*/

import _ from 'lodash'
export default {
    data(){
        return {
            MACHINE_RUNNED_PART_NO:_.cloneDeep(this.$store.state.runned.MACHINE_RUNNED_PART_NO),
            name:'',
            selected:{},
            search:'',
            headerRunningPartNo:[
        { text: 'Machine Id', value: 'machine_id' },
        { text: 'PRODUCT NAME', value: 'product_name' },
        { text: 'MATERIAL CODE', value: 'material_code' },
        { text: 'PART NO', value: 'part_no' },
        { text: 'TOTAL COUNT', value: 'total_count' },
        { text: 'GOOD COUNT', value: 'good_count' },
        { text: 'REJECT COUNT', value: 'reject_count' },
        { text: 'IDEAL CYCLE', value: 'ideal_cyle' },
],
        }
    },
methods:{
submit(){
var $vm=this;
$vm.$confirm("DO YOU WANT TO CLOSE SHIFT?")
.then(()=>{

    $vm.$store.dispatch('CLOSE_SHIFT',{
    MACHINE_RUNNED_MAIN:_.cloneDeep($vm.$store.state.runned.MACHINE_RUNNED_MAIN),
    MACHINE_RUNNED_PART_NO:_.cloneDeep($vm.MACHINE_RUNNED_PART_NO),
    // MACHINE_RUNNED_ACTIVITY:$vm.$store.state.runned.MACHINE_RUNNED_ACTIVITY
    }).then(async()=>
    { 
     $vm.$store.commit('clearMachineSessionId');
     await $vm.$store.dispatch("GET_MACHINE_STATUS_BY_DATE")

     //get history


    })
    
})

},
selectProduct(value){
var $vm=this;
$vm.selected=value
console.log("selected",value)

$vm.$store.commit('setShiftManually',value)
        }
    }
}
</script>
<style lang="scss">
    
</style>