// // This file is required by the index.html file and will
// // be executed in the renderer process for that window.
// // All of the Node.js APIs are available in this process.
// console.log("++++++serial port+++++")
// const { SerialPort } = require('serialport')('./')
// const tableify = require('tableify')

// async function listSerialPorts() {
//   await SerialPort.list().then((ports, err) => {
//     if(err) {
//       console.log("serial port++++",err)
//       // document.getElementById('error').textContent = err.message
//       return
//     } else {
//       console.log("serial port++++",'nothing')
//       // document.getElementById('error').textContent = ''
//     }
//     console.log('ports', ports);

//     if (ports.length === 0) {
//       console.log("serial port++++","no port discovered")
//       // document.getElementById('error').textContent = 'No ports discovered'
//     }

//   var  tableHTML = tableify(ports)
//   console.log(tableHTML)
//     // document.getElementById('ports').innerHTML = tableHTML
//   })
// }

// function listPorts() {
//   listSerialPorts();
//   setTimeout(listPorts, 2000);
// }

// // Set a timeout that will check for new serialPorts every 2 seconds.
// // This timeout reschedules itself.
// setTimeout(listPorts, 2000);

// listSerialPorts()