<template>
 <div style="padding: 10px">
  <div class="toolbar_container">
   <div @click="createShiftDialog = true">
    <v-icon>mdi-plus</v-icon>
   </div>
  </div>

  <h2>Groups</h2>

  <v-data-table :headers="headers" :items="$store.state.db.groups" :search="search">
  </v-data-table>

  <v-row justify="center">
   <v-dialog v-model="createShiftDialog" persistent max-width="600px">
    <v-card>
     <v-card-title>
      <span class="text-h5">Group Info</span>
     </v-card-title>
     <v-card-text>
      <v-container>
       <v-row>
        <v-col cols="12">
         <v-text-field
         dense
          label="Group*"
          v-model="group.name"
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
     value: "name",
    },

   ],
   group: {
    company_id:1,
    name: "",
    },
  };
 },
 methods:{
 
 save(){
var $vm=this;
if(!utils.validation('string',$vm.group.name))
{
  $vm.$alert("Please fill the Name")
  return ;
}
console.log("saved",$vm.group)
$vm.$store.dispatch("createGroup",$vm.group)


 },


      timeFormat(string){

        return moment(string).format(this.$store.state.setup.format.time)
    },
        dateFormat(string){

        return moment(string).format(this.$store.state.setup.format.date)
    }
 },
 computed:{
    //  group.username () {
    //     var $vm=this;
    //     console.log(String($vm.group.username))
    //     return moment(String($vm.group.username)).format("HH:MM");
    //   },
 }
};
</script>
<style lang="scss"></style>
