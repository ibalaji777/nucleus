<template>
  <v-row justify="center">
    <v-dialog
      v-model="$store.state.dialog.operatorLoginDialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
               >
                <v-text-field
                outlined
                v-model="operator.username"
                  label="Username(*)"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
               >
                <v-text-field
                outlined
                v-model="operator.password"
                  label="Password(*)"
                          type="password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="$store.commit('setDialog',{key:'operatorLoginDialog',value:false})"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="operatorLogin"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  
data(){
  return {
  operator:{
username:'',
passowrd:''
  }
  }
},
  methods:{

operatorLogin(){

var $vm=this;

if($vm.operator.username==''){
  $vm.$alert("Username is must be Filled")

return;
}

if($vm.operator.password==''){
  $vm.$alert("Password Must Be Filled")
  return;

}
//do some stuff

}

  }
}
</script>