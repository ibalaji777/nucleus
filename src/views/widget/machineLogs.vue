<template>
<!-- eslint-disable -->
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Name
        </th>
        <th class="text-left">
          Calories
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in desserts"
        :key="item.name"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
      </tr>
    </tbody>
  </v-table>

     <!-- <CustomPagination
      :total-items="list.total"
      :items-per-page="list.perPage"
      :current-page="currentPage"
      @page-changed="changePage"
    ></CustomPagination> -->
</template>
<script>
// import CustomPagination from './CustomPagination.vue'

  export default {
    data () {
      return {
        list:{
            total:0,
            perPage:10,
        },
       currentPage:1,
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Jelly bean',
            calories: 375,
          },
          {
            name: 'Lollipop',
            calories: 392,
          },
          {
            name: 'Honeycomb',
            calories: 408,
          },
          {
            name: 'Donut',
            calories: 452,
          },
          {
            name: 'KitKat',
            calories: 518,
          },
        ],
      }
    },
//     components:{
// CustomPagination
//     },
    mounted(){
var $vm=this;

$vm.$store.dispatch('MACHINE_LOGS');

    },
    methods:{

changePage(page){
let $vm=this;
$vm.$store.dispatch('MACHINE_LOGS',{page});


        }




    }
  }
</script>
<style lang="scss">
    
</style>