const mongoose = require('mongoose'); //MongoDB driver
const dotenv = require('dotenv');

// Read variables from the file config.env and
// and set them as environment variable
dotenv.config({ path: './config.env' });

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );
const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful');
  });

//make sure we require(app) after we set env variables
const app = require('./app');

// SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running at port ${port}...`);
});
