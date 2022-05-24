const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  //solution 1
  //   fs.readFile("./test-file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });

  //solution 2
  //this solution uses stream method to transfer data
  //when certain chunk of data is ready to transfer it emmits event
  //we use event handler to listen to the event

  //   const readable = fs.createReadStream("./testtt-file.txt");
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });
  //   readable.on("end", () => {
  //     res.end();
  //   });
  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File not found");
  //   });

  // Solution 3

  //this solution automatically handles backpressure and uses stream

  const readable = fs.createReadStream("./test-file.txt");
  readable.pipe(res); //syntax: readableSource.pipe(writable destination stream)
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});
