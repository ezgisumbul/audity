'use strict';

const path = require('path');
const express = require('express');
const createError = require('http-errors');
const connectMongo = require('connect-mongo');
const cors = require('cors');
const expressSession = require('express-session');
const logger = require('morgan');
const serveFavicon = require('serve-favicon');
const basicAuthenticationDeserializer = require('./middleware/basic-authentication-deserializer.js');
const bindUserToViewLocals = require('./middleware/bind-user-to-view-locals.js');

const baseRouter = require('./routes/base');
const authenticationRouter = require('./routes/authentication');
const libraryRouter = require('./routes/library');
const soundRouter = require('./routes/sound');
const profileRouter = require('./routes/profile');
const messageRouter = require('./routes/message');

const app = express();

app.use(serveFavicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(
  cors({
    ...(process.env.CLIENT_APP_ORIGINS && {
      origin: process.env.CLIENT_APP_ORIGINS.split(',')
    }),
    credentials: true
  })
);
app.use(express.json({ limit: '50mb' }));
/*  */
app.use(express.urlencoded({ limit: '50mb', extended: true }));
/*  */
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    proxy: true,
    proxy: true,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : false,
      secure: process.env.NODE_ENV === 'production'
    },
    store: connectMongo.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 60 * 60
    })
  })
);
app.use(basicAuthenticationDeserializer);
app.use(bindUserToViewLocals);

app.use('/sound', soundRouter);
app.use('/', baseRouter);
app.use('/authentication', authenticationRouter);
app.use('/profile', profileRouter);
app.use('/message', messageRouter);
app.use('/library', libraryRouter);

// // to debug iOS - Safari

// app.use('/api/sound', soundRouter);
// app.use('/api/', baseRouter);
// app.use('/api/authentication', authenticationRouter);
// app.use('/api/profile', profileRouter);
// app.use('/api/message', messageRouter);
// app.use('/api/library', libraryRouter);

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ type: 'error', error: { message: error.message } });
});

module.exports = app;
