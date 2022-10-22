<template>
 <div style="padding: 10px">
  <div class="toolbar_container">
   <div @click="createShiftDialog = true">
    <v-icon>mdi-plus</v-icon>
   </div>
  </div>

  <h2>Shift List</h2>

  <v-data-table :headers="headers" :items="$store.state.setup.shifts" :search="search">
  </v-data-table>

  <v-row justify="center">
   <v-dialog v-model="createShiftDialog" persistent max-width="600px">
    <v-card>
     <v-card-title>
      <span class="text-h5">SHIFT</span>
     </v-card-title>
     <v-card-text>
      <v-container>
       <v-row>
        <v-col cols="12">
         <v-text-field
          label="Shift Name*"
          v-model="shift.name"
          required
         ></v-text-field>
        </v-col>
        <v-col cols="12">
         <v-text-field
          label="Shift Start Time"
          v-model="shift.start"
          required
         ></v-text-field>
        </v-col>
        <v-col cols="12">
         <v-text-field
          label="Shift End Time"
          v-model="shift.end"
          required
         ></v-text-field>
        </v-col>
       </v-row>
      </v-container>
      <small>*indicates required field</small>
     </v-card-text>
     <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="createShiftDialog = false">
       Close
      </v-btn>
      <v-btn color="blue darken-1" text @click="save()">
       Save
      </v-btn>
     </v-card-actions>
    </v-card>
   </v-dialog>
  </v-row>
 </div>
</template>
<script>
/*eslint-disable*/
import moment from 'moment'
import * as utils from '../core/utils.js'
export default {
 data() {
  return {

   search: "",
   createShiftDialog: false,
   isManualId: false,
   modalStartTime:false,
   items: [],
   headers: [
    {
     text: "Name",
     align: "start",
     filterable: false,
     value: "name",
    },

    {
     text: "Shift Start",
     align: "start",
     filterable: false,
     value: "start",
    },
    
    {
     text: "Shift End",
     align: "start",
     filterable: false,
     value: "end",
    },
   ],
   shift: {
    name: "",
    company_id:'',
    start: moment().format("hh:mm a"),
    end: moment().add(8,'hours').format("hh:mm a"),
   
   },
  };
 },
 methods:{
 
 save(){
var $vm=this;
if(!utils.validation('string',$vm.shift.name))
{
  $vm.$alert("Name Must Be Filled")
  return ;
}
if(!utils.validation('time',$vm.shift.start))
{
  $vm.$alert("Please Check Time Format HH:MM AM/PM")
  return ;
}
if(!utils.validation('time',$vm.shift.end))
{
  $vm.$alert("Please Check Time Format HH:MM AM/PM")
  return ;
}

console.log("saved",$vm.shift)

$vm.$store.dispatch("createShift",$vm.shift)


 },


      timeFormat(string){

        return moment(string).format(this.$store.state.setup.format.time)
    },
        dateFormat(string){

        return moment(string).format(this.$store.state.setup.format.date)
    }
 },
 computed:{
    //  shift.start () {
    //     var $vm=this;
    //     console.log(String($vm.shift.start))
    //     return moment(String($vm.shift.start)).format("HH:MM");
    //   },
 }
};
</script>
<style lang="scss"></style>
