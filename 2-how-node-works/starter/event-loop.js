const fs = require("fs");

setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));
fs.readFile("{__dirname}/test-file.txt", (err, data) => {
  console.log("I/O finished");
  setTimeout(() => console.log("Timer 2 finished"), 0);
  setTimeout(() => console.log("Timer 3 finished"), 3000);
  setImmediate(() => console.log("Immediate 2 finished"));
  setTimeout(() => console.log("Timer 4 finished"), 0);
  setImmediate(() => console.log("Immediate 3 finished"));
});
//top level code because it is not inside any callback functions
console.log("hello from top level code");
