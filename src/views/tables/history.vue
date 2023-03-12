<template>
<div>
  <v-data-table :headers="headers" :items="$store.state.machineHistory">
   <template v-slot:item.start_time="{ item }">
      {{ formatTime(item.start_time) }}
    </template>
  </v-data-table>
 </div>

</template>

<script>
import moment from 'moment';
export default {
  data() {
    return {
      headers: [
        { text: 'Start Time', value: 'start_time' },
        { text: 'Duration', value: 'duration' },
        { text: 'Machine Status', value: 'action' },
        { text: 'Reason', value: 'reason' },
        { text: 'Shift', value: 'shift' },
      ],
     };
  },
  methods: {
 formatTime(date) {
      return moment(date).format('HH:mm:ss');
    },
},
};
</script>
