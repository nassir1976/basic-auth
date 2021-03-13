'use strict '
 const express = require('express')
 
 const bcrypt = require('bcrypt') // encryption for saving pw to the DB
 const base64 = require('base-64') // encoding for passing over the internet
 const UserModel = require('../models/users-model.js')
 const basicAuth = require('../middleware/basicAuth.js')
 

 const router = express.Router()

router.post('/signup', signup)
router.post('/signin', basicAuth, signin)

async function signup(req, res) {
  // try {
  //   const user = new UserModel(req.body);
  //   const record = await user.save(req.body)
  //   console.log('ss', user)
  //   res.status(201).json(record)
  // }catch(error){res.status(403).send ('error to create user');}
  if(!req.body.username){res.status(500).send('Need username')}
  else if(!req.body.password){res.status(500).send('Need password')}
else{
  let password = req.body.password
  let username = req.body.username
   let encryptedPassword = await bcrypt.hash(password, 5)
   const user = new UserModel({username:username, password:encryptedPassword})
   const record = await user.save({username:username,password:encryptedPassword})
   
    res.status(201).json(record)
}
}

function signin(req, res, next){
  console.log('nassir')
 const userFromDB = req.params.userFromDB
 console.log('from mongoose', req.body)
  res.status(200).json({ user: req.user});
}




 module.exports = router;