const os = require('os');
var cpu = os.cpus();
var totalMemory = os.totalmem();
var freeMemory = os.freemem();

// console.log(cpu);
// console.log('Total Memory: ' + totalMemory);

//ES2015 ou ES6
//String Templates

console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);
