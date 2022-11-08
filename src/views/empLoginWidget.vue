<template>
<v-row justify="center" style="background:white">

<v-dialog
width="700"
v-model="$store.state.dialog.empLoginWidgetDialog">
<v-card>
    <v-toolbar
dark
color="primary"
>
<v-toolbar-title>Login</v-toolbar-title>
<v-spacer></v-spacer>
<v-btn
icon
dark
@click="$store.commit('setDialog',{key:'empLoginWidgetDialog',value:false})"
>
<v-icon>mdi-close</v-icon>
</v-btn>

<v-toolbar-items>
</v-toolbar-items>
</v-toolbar>


<div style="height:400px;background:white;padding:10px;margin:5px"> 


<div >
       <div>
        <!-- <img style="max-height:150px"  src="/login.gif" alt=""> -->
<!-- {{$store.state.setup.employee}} -->
         <v-text-field
         outlined
         style="text-align:center"
          label="Username(*)"
          v-model="employee.username"
          required
         ></v-text-field>
        </div>
        <div>
         <v-text-field
         outlined
         type="password"
          label="Password(*)"
          v-model="employee.password"
          required
         ></v-text-field>
        </div>
        <div style="text-align:center">
      <v-btn outlined style="width:100%;background:#43386A;color:white" @click="login">LOGIN</v-btn>
        </div>
 </div>

 
    </div>
</v-card>
</v-dialog>
</v-row>
</template>
<script>
/*eslint-disable*/
import _ from 'lodash'
/*eslint-disable*/
export default {
   data(){
        return{
            employee:{
                username:'',
                password:''
            }
        }
    },
    methods:{

        login(){
            var $vm=this;

            if($vm.employee.username=='admin'&&$vm.employee.password=='admin'){

                $vm.$store.dispatch('setemployee',{id:1,username:'admin',password:'admin'})

                $vm.$router.push("/home")

            }

        }
    }
}
</script>
<style lang="scss">
    
</style>