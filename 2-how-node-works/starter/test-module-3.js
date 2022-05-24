const { builtinModules } = require("module");

console.log("This is expected to be called once");

module.exports = () => console.log("hello");
