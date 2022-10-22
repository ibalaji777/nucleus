<template>
    <div>

<img class="fullBg" src="/login.png" alt="">
<div class="xyCenter">
       <div>
        <!-- <img style="max-height:150px"  src="/login.gif" alt=""> -->

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
         type="password"
          label="Password(*)"
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

        login(){
            var $vm=this;

            if($vm.company.username=='admin'&&$vm.company.password=='admin'){

                $vm.$store.dispatch('setCompany',{id:1,username:'admin',password:'admin'})

            }

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
    background: cornsilk;
    width: 30vw;
    height: 20vw;
    padding: 10px;
    border: 2px solid cadetblue;
    box-shadow: 9px 4px 32px 7px;
}
</style>