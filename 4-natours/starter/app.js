const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
//necessary for the use of static files
//without defining url we can now acess all static files like
//127.0.0.1:3000/overview.html without defining that specific URL
//when no files are found from the url it checks at 'public' directory
//and considers public directory root directory hence no
//"127.0.0.1:3000/public/overview.html" this is incorrect

app.use((req, res, next) => {
  console.log('Hello From the Console');
  next(); //if we dont call next our request-response cycle gets stuck
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// ROUTES
//mounting the routers
//when we have this url call the router tourRouter
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
