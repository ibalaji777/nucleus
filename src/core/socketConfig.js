
/*eslint-disable*/
// import io from 'socket.io-client'
import * as config from './config'
import _ from 'lodash'
// const bgSocket = io(config.backend);


// export function createMachineActivity(data){
// bgSocket.emit('FN_INSERT_MACHINE_ACTIVITY',data);
// }
// export function SK_IO_INSERT_MACHINE_ACTIVITY(data){
//   bgSocket.emit('SK_IO_INSERT_MACHINE_ACTIVITY',data);
//   }
// export function SK_IO_INSERT_MACHINE_PART_NO(data){
// bgSocket.emit('SK_IO_INSERT_MACHINE_PART_NO',data);
// }
// export function SK_IO_INSERT_MACHINE_MAIN(data){
// bgSocket.emit('SK_IO_INSERT_MACHINE_MAIN',data);
// }

export function initSerialPort($vm){

    if($vm.$store.state.dialog.isDemoPlugin){
        const socket = io(config.serialPortUrl);
      
      $vm.$store.commit('setEmbededStatus',false)
      $vm.$store.commit('setMachineStatus',false)
      
      socket.on('connect_failed', function(){
        
          console.log('Connection Failed');
      });
      
      setInterval(()=>{
      $vm.$store.commit('setTimeEverySecond')
      $vm.$store.commit('setDate')
      var currentTime=$vm.$store.state.setup.time;
      var currentShift=_.filter($vm.$store.state.db.shifts,(x)=>{
      if(x.start_time <= currentTime&&x.end_time >= currentTime) return true;
      return false;
      })
      if(currentShift.length!=0&&$vm.$store.state.setup.selected_shift.id!=currentShift[0].id)
      $vm.$store.commit('setShift',currentShift[0])
      
      },700)
      
   
      socket.on('connect_error', err => handleErrors($vm,err))
      socket.on('connect_failed', err => handleErrors($vm,err))
      socket.on('disconnect', err => handleErrors($vm,err))
      socket.on("readData", async (data) => {
      
      
      var dataset=JSON.parse(data);
      var machineStatus=dataset.machine==1?true:false
      var result={...dataset,machine:machineStatus}
      //machine in continues mode and signal
      $vm.$store.commit('setMachineStatus',result.machine)
      //serial port started read
      $vm.$store.commit('setEmbededStatus',true)
      //live data from machine 
      $vm.$store.commit('machineLiveData',result)
      // console.log("embeded",result)
      
      
      })
      }
}


function handleErrors($vm,err)
{
$vm.$store.commit('setEmbededStatus',false)
$vm.$store.commit('setMachineStatus',false)
  console.log("Failed to connect")
}