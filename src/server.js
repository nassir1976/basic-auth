'use strict'
const express = require('express');
const UserModel = require('./models/users-model.js')

// const routeNotFound = require('./error-handlers/404.js');
const errorsFound = require('./error-handlers/500.js');
const router = require('./routes/router.js')
// const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 3333;

const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(router)
// app.use('*', routeNotFound);
// error handling middleware is always at the bottom of the
app.use(errorsFound);



module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`listening on ${port}`);
    });
  }
}