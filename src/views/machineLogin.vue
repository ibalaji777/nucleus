<template>
 <div>
  <div class="xyCenter">
   <div>
    <div style="display: flex; justify-content: center; margin: 10px 0">
     <div class="icon bg-gradient-primary shadow text-center border-radius-md">
      <v-icon style="color: white">mdi-account</v-icon>
     </div>
    </div>
    <!-- {{$store.state.setup.company}} -->
    <v-text-field
     outlined
     style="text-align: center"
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
   <div style="text-align: center">
    <v-btn
     outlined
     class="bg-gradient-primary"
     style="width: 100%; margin: 10px 0; color: white"
     @click="login"
     >LOGIN</v-btn
    >
   </div>
  </div>
 </div>
</template>
<script>
/*eslint-disable*/
export default {
 data() {
  return {
   company: {
    username: "",
    password: "",
   },
  };
 },
 mounted() {
  var $vm = this;
  $vm.$store.commit("machineWatcher", false);
 },
 methods: {
  async login() {
   var $vm = this;
   if ($vm.company.username == "") {
    $vm.$alert("Please Fill Company Username");
    return;
   }
   if ($vm.company.password == "") {
    $vm.$alert("Please Fill Machine Code");
    return;
   }

   $vm.$store.commit("login", $vm.company);
   var result = await $vm.$store.dispatch("MACHINE_LOGIN", $vm.company);
   if (result.data.success) {
    $vm.$router.push({ name: "home" });
   }
   $vm.$alert(result.data.msg);
   // $vm.$router.push("/home")
  },
 },
};
</script>
<style lang="scss">
.fullBg {
 width: 100%;
 height: 100%;
 position: absolute;
 top: 0;
 left: 0;
}

.xyCenter {
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
