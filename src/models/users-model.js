'use strict'
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


// mongoose Model//
 // this is the blueprint of data-collection.js======SCHEMA====  LIKE SCHEMA.SQL

 const userSchema = mongoose.Schema({ // note: mongoose.Schema is a constructor
  username: {type: String, required: true},
  password: {type: String, required: true}
});


const  UserModel = mongoose.model('users', userSchema);


userSchema.pre('save',async function(){
  if (this.isModified('this.password')){
    this.password= await bcrypt.hash(this.password,5)
  }
})
//static methods belong to the construction 
userSchema.statics.authenticateBasic = async function (username, password){
  let userFromDB = await this.findOne({username:username})
  let isValid = await bcrypt.compare(password, userFromDB.password);
  if(isValid){
    return userFromDB
  }else{
    throw new Error ('validation Error')
  }
}







module.exports = UserModel;




