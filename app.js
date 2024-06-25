var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var connectDB = require('./config/db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();

// Connect to MongoDB
connectDB();

// Enable CORS
app.use(cors({
  origin: '*'
}));

// Logger and parsers
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

// Session management
app.use(session({
  secret: 'yourSecretKey', // Use a strong secret in production
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Use secure: true in production with HTTPS
}));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Send the main frontend application for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Error handler
app.use(function (err, req, res, next) {
  // Log the error to the console for debugging
  console.error(err);

  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Send error response
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;




//ORGINAL USING SESSION
// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var connectDB =require('./config/db')
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var adminRouter = require('./routes/admin');
// var bodyParser = require('body-parser');
// var cors = require('cors');
// const session = require('express-session');



// var app = express();
// connectDB();




// app.use(express.json()); // For parsing application/json
// app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false } // Add this line to set the cookie secure flag to false
// }));

// const corsOptions = {
//   origin: ['http://localhost:3000','https://emenu-adminfrontent.web.app','https://66751071803efa24f0dbf491--tangerine-shortbread-ff4a5b.netlify.app/'], // Add the allowed origin(s) here
 
// };
// app.use(cors(corsOptions));



// // app.use(cors({
// //   origin: 'https://emenu-adminfrontent.web.app',
// //   credentials: true // Allow credentials to be sent
// // }));



// // For Development (origin: '*')
// // app.use(cors({
// //   origin: '*',
// //   credentials: true
// // }));


// // WORKING
// //for production-hosting
// // app.use(cors({
// //   origin:'http://localhost:3000',
// //   credentials: true // Allow credentials to be sent
// // }));



// // view engine setup


// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/admin', adminRouter);


// // app.use('/images', express.static(path.join(__dirname, 'images')));


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // send error as JSON response
//   res.status(err.status || 500);
//   res.json({ error: err.message });
// });

// module.exports = app;
