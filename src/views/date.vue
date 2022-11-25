<template>
    <div>
        <v-row>
            <v-col class="pa-5">
                <v-select
                    v-model="select_date"
                    :items="date_types"
                    label="Date"
                    item-text="title"
                    item-value="value"
                    @change="choose_date_type"
                    dense

                ></v-select
            ></v-col>
            <v-col v-if="select_date == 'custom_date'">
                <div >
                    <div style="display:flex">
                        <div style="width:45%">
                            <v-menu
                                ref="from_menu"
                                v-model="from_menu"
                                :close-on-content-click="false"
                                :return-value.sync="from_date"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model="from_date"
                                        label="From"
                                        prepend-icon="event"
                                        readonly
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="from_date"
                                    no-title
                                    scrollable
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="from_menu = false"
                                        >Cancel</v-btn
                                    >
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.from_menu.save(from_date)"
                                        >OK</v-btn
                                    >
                                </v-date-picker>
                            </v-menu>
                        </div>
                        <div style="width:45%">
                            <v-menu
                                ref="to_menu"
                                v-model="to_menu"
                                :close-on-content-click="false"
                                :return-value.sync="to_date"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model="to_date"
                                        label="To Date"
                                        prepend-icon="event"
                                        readonly
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="to_date"
                                    no-title
                                    scrollable
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="to_menu = false"
                                        >Cancel</v-btn
                                    >
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.to_menu.save(to_date)"
                                        >OK</v-btn
                                    >
                                </v-date-picker>
                            </v-menu>
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
        <!-- <v-row>
            <v-col>
                <v-checkbox
                    v-model="isDateEnabled_general_dashboard"
                    :label="`Enable Date`"
                ></v-checkbox>
            </v-col>
        </v-row> -->
    </div>
</template>

<script>
/*eslint-disable*/
import moment from 'moment'
export default {
    data() {
        return {
            isDateEnabled_general_dashboard: false,
            select_date: "today",
            date_types: [
                {
                    title: "Today",
                    value: "today"
                },
                {
                    title: "Yesterday",
                    value: "yesterday"
                },
                {
                    title: "Last 7 Days",
                    value: "last_7_days"
                },
                {
                    title: "Last 30 Days",
                    value: "last_30_days"
                },
                {
                    title: "This Month",
                    value: "this_month"
                },
                {
                    title: "Last Month",
                    value: "last_month"
                },
                {
                    title: "Custom Date",
                    value: "custom_date"
                }
            ],
            from_date: moment().format("YYYY-MM-DD"),
            to_date: moment().format("YYYY-MM-DD"),
            from_menu: false,
            from_modal: false,
            to_menu: false,
            to_modal: false
        };
    },
    methods:{
 choose_date_type_optoin(action){
  var from_date=moment().format("YYYY-MM-DD"),to_date=moment().format("YYYY-MM-DD");
      if(action=='today'){
      from_date=moment().format("YYYY-MM-DD");
      to_date=moment().format("YYYY-MM-DD");
      }
      
      if(action=='yesterday'){
      from_date=moment().subtract(1, 'days').format("YYYY-MM-DD");
      to_date=moment().subtract(1, 'days').format("YYYY-MM-DD");
      }
      
      if(action=='last_7_days'){
      from_date=moment().subtract(6, 'days').format("YYYY-MM-DD");
      to_date=moment().format("YYYY-MM-DD");
      }
      
      if(action=='last_30_days'){
      from_date=moment().subtract(29, 'days').format("YYYY-MM-DD");
      to_date=moment().format("YYYY-MM-DD");
      }
      
      if(action=='this_month'){
      from_date=moment().startOf('month').format("YYYY-MM-DD");
      to_date=moment().endOf('month').format("YYYY-MM-DD");
      }
      if(action=='last_month'){
      from_date=moment().subtract(1, 'month').startOf('month').format("YYYY-MM-DD");
      to_date=moment().subtract(1, 'month').endOf('month').format("YYYY-MM-DD");
      }
  

      // store.commit('set_date',{action,from_date,to_date})
      return {
          from_date,
          to_date
      }
  },

        choose_date_type(action){
            var $vm=this;

var date=this.choose_date_type_optoin(action)
if(date['from_date']&&date['to_date']){
  this.$emit('date',{from_date:date.from_date,to_date:date.to_date})
}
        }
    },
    watch:{
        from_date(){
            var $vm=this;
          this.$emit('date',{from_date:this.from_date,to_date:$vm.to_date})
        },
       to_date(){
                       var $vm=this;
          this.$emit('date',{from_date:this.from_date,to_date:$vm.to_date})

        },
    }
};
</script>
