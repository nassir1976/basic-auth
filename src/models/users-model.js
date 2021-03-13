'use strict'
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


// mongoose Model//
 // this is the blueprint of data-collection.js======SCHEMA====  LIKE SCHEMA.SQL

 const userSchema = mongoose.Schema({ // note: mongoose.Schema is a constructor
  username: {type: String, required: true},
  password: {type: String, required: true}
});


const  User = mongoose.model('users', userSchema);


module.exports = User;




