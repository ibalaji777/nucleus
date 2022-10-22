<template>
 <div style="padding: 10px">
  <div class="toolbar_container">
   <div @click="createShiftDialog = true">
    <v-icon>mdi-plus</v-icon>
   </div>
  </div>

  <h2>Company</h2>

  <v-data-table :headers="headers" :items="$store.state.db.companies" :search="search">
  </v-data-table>

  <v-row justify="center">
   <v-dialog v-model="createShiftDialog" persistent max-width="600px">
    <v-card>
     <v-card-title>
      <span class="text-h5">Company Info</span>
     </v-card-title>
     <v-card-text>
      <v-container>
       <v-row>
        <v-col cols="12">
         <v-text-field
         dense
          label="Company Name*"
          v-model="company.company_name"
          required
         ></v-text-field>
        </v-col>
        <!-- <v-col cols="12">
         <v-text-field
         dense
          label="Username"
          v-model="company.username"
          required
         ></v-text-field>
        </v-col> -->
        <v-col cols="12">
         <v-text-field
         dense
          label="Password"
          v-model="company.password"
          type="password"
          required
         ></v-text-field>
        </v-col>
                 <v-col cols="12">
         <v-text-field
         dense
          label="Email"
          v-model="company.email"
          required
         ></v-text-field>
        </v-col>
    <v-col cols="12" style="display:flex">

         <v-text-field
         
         dense
          label="Dial Code"
          style="width:20px;margin-right:2px;"
          v-model="company.dialcode"
          required
         ></v-text-field>
         <v-text-field
         dense
          label="Phone"
          v-model="company.phone"
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
     value: "company_name",
    },

    {
     text: "Username",
     value: "username",
    },
    
    {
     text: "Phone",
     value: "phone",
    },
        {
     text: "Email",
     value: "phone",
    },
   ],
   company: {
    company_name: "",
    // username: '',
    password: '',
    phone:'',
    email:'',
    dialcode:'91'
   
   },
  };
 },
 methods:{
 
 save(){
var $vm=this;
if(!utils.validation('string',$vm.company.company_name))
{
  $vm.$alert("Please Fill Company Name")
  return ;
}
if(!utils.validation('string',$vm.company.username))
{
  $vm.$alert("Please Fill Username")
  return ;
}
if(!utils.validation('string',$vm.company.password))
{
  $vm.$alert("Please Fill Password")
  return ;
}

if(!utils.validation('string',$vm.company.email))
{
  $vm.$alert("Please Fill Email")
  return ;
}
if(!utils.validation('string',$vm.company.phone))
{
  $vm.$alert("Please Fill Phone")
  return ;
}

if(!utils.validation('string',$vm.company.dialcode))
{
  $vm.$alert("Please Fill Dialcode")
  return ;
}

console.log("saved",$vm.company)

$vm.$store.dispatch("createCompany",$vm.company)


 },


      timeFormat(string){

        return moment(string).format(this.$store.state.setup.format.time)
    },
        dateFormat(string){

        return moment(string).format(this.$store.state.setup.format.date)
    }
 },
 computed:{
    //  company.username () {
    //     var $vm=this;
    //     console.log(String($vm.company.username))
    //     return moment(String($vm.company.username)).format("HH:MM");
    //   },
 }
};
</script>
<style lang="scss"></style>
