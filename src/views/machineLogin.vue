<template>
    <div>

<div class="xyCenter">
       <div>
    
    <h4 style="text-align:center">    MACHINE LOGIN</h4>

<!-- {{$store.state.setup.company}} -->
         <v-text-field
         outlined
         style="text-align:center"
          label="Username(*)"
          v-model="company.username"
          required
         ></v-text-field>
        </div>
        <div>
         <v-text-field
         outlined
          label="Password(*)"
          type="password"
          v-model="company.password"
          required
         ></v-text-field>
        </div>
        <div style="text-align:center">
      <v-btn outlined style="width:100%;background:#43386A;color:white" @click="login">LOGIN</v-btn>
        </div>
 </div>

        
    </div>
</template>
<script>
/*eslint-disable*/
export default {
    
    data(){
        return{
            company:{
                username:'',
                password:''
            }
        }
    },
    methods:{

async        login(){
            var $vm=this;
if($vm.company.username==''){
    $vm.$alert("Please Fill Company Username")
    return;
}
if($vm.company.password==''){
    $vm.$alert("Please Fill Machine Code")
    return;
}
var result=await $vm.$store.dispatch('MACHINE_LOGIN',$vm.company)
if(result.data.success){
$vm.$router.push({name:'home'})
}
$vm.$alert(result.data.msg)
// $vm.$router.push("/home")

        }
    }
}
</script>
<style lang="scss">
.fullBg{
    width:100%;
    height:100%;
    position: absolute;
    top:0;
    left:0;
}

.xyCenter{
position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // background: cornsilk;
    width: 30vw;
    padding: 10px;
    // border: 2px solid cadetblue;
    box-shadow: 9px 4px 32px 7px;
}
</style>