//modules.exports
const C = require("./test-module-1");
const calc = new C();
console.log(calc.add(5, 6));

//exports
const calcExp = require("./test-module-2");
console.log(calcExp.add(3, 4));

//destructure feature of js
const { multiply } = require("./test-module-2");
console.log(multiply(3, 4));

//caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
//the top code runs only once because it is loaded only once
