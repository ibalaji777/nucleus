<template>
    <div style="padding:10px">
        <div class="toolbar_container">
        <div @click="createMachineDialog=true">
    <v-icon>mdi-plus</v-icon>    
    </div>
    </div>

<h2>Machine List</h2>

<v-data-table
      :headers="headers"
      :items="items"
      :search="search"
    >
    
    
    </v-data-table>


    <v-row justify="center">
    <v-dialog
      v-model="createMachineDialog"
      persistent
      max-width="600px"
    >
    
      <v-card>
        <v-card-title>
          <span class="text-h5">Machine</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                
              >
                <v-text-field
                  label="Machine Name*"
                  v-model="machine.name"
                  required
                ></v-text-field>
              </v-col>
              <!-- <v-col
                cols="12"
                
              >
              <v-switch label="Machine Id" v-model="isManualId"></v-switch>
                <v-text-field
                v-if="isManualId"
                  label="Machine Id(Auto)"
                  v-model="machine.machine_id"
                  required
                ></v-text-field>
              </v-col>
 -->
              
                      <v-col
                cols="12"
                
              >
                <v-text-field
                  label="Type"
                  v-model="machine.type"
                  required
                ></v-text-field>
                      </v-col>
                        <v-col
                cols="12"
               
              >
                <v-text-field
                  label="Description(optional)"
                  v-model="machine.description"
                  required
                ></v-text-field>
                        </v-col>
                                <v-col
                cols="12"
             
              >
                 <v-text-field
                  label="Building/Block(optional)"
                  v-model="machine.block"
                  required
                ></v-text-field>
             <v-text-field
                  label="Other Info(optional)"
                  v-model="machine.other"
                  required
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
            @click="createMachineDialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="createMachineDialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
    </div>
</template>
<script>
export default {
    data(){
        return{
            search:'',
        createMachineDialog:false,
        isManualId:false,
        items:[],
        headers:[
            {
            text: 'Machine Id(*)',
            align: 'start',
            filterable: false,
            value: 'machineId',
          },
           {
            text: 'Name',
            align: 'start',
            filterable: false,
            value: 'name',
          },
           {
            text: 'type',
            align: 'start',
            filterable: false,
            value: 'type',
          },
          {
            text: 'desc',
            align: 'start',
            filterable: false,
            value: 'desc',
          }
          ],
        machine:{
            name:'',
            type:'',
            description:'',
            block:'',
            other:"",

        }
        }
    }
}
</script>
<style lang="scss">
    
</style>