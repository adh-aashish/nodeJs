const http = require("http");

// const EventEmitter = require("events");

// class Sales extends EventEmitter {
//   constructor() {
//     super();
//   }
// }

// const myEmitter = new Sales();

// myEmitter.on("newSale", () => {
//   console.log("New Sale made");
// });

// myEmitter.on("newSale", () => {
//   console.log("Customer name: Aashish");
// });

// myEmitter.emit("newSale");

//////////////////SERVER////////////////
const server = http.createServer();

server.on("request", (req, res) => {
  console.log("New request received!");
  console.log(req.url);
  res.end("Request Recieved");
});

server.on("request", (req, res) => {
  console.log("Another request");
});

server.on("close", () => {
  console.log("Server Closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for the response...");
});
