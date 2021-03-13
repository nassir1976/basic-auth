'use strict '
 const express = require('express')
 
 const bcrypt = require('bcrypt') // encryption for saving pw to the DB
 const base64 = require('base-64') // encoding for passing over the internet
 const User = require('../models/users-model.js')
 const basicAuth = require('../middleware/basicAuth.js')
 

 const router = express.Router()

router.post('/signup', async (req, res) => {
  try {
     req.body.password = await bcrypt.hash(req.body.password, 5);
    const user = new User(req.body);
    console.log('after instantiation of model:', user);
    const record = await user.save(req.body);
    console.log('after saving the record in the db', record);
    res.status(200).json(record); 
  } catch {
    res.status(500).send("Need username");
  }
});

// SIGN IN will pull the username:password off of a "authorization" header

router.post('/signin', async (req, res) => {
  let basicAuthParts = req.headers.authorization.split(' ') // authorization '2u98432:023j0jwf -> ['basic', 
  let encodedUser = basicAuthParts.pop(); // username:password as base64 -> 2u98432:023j0jwf
  let decoded = base64.decode(encodedUser); // username:password
  let [username, password] = decoded.split(':'); // split at the : (username, password)

  try {
    const user = await User.findOne({ username: username })
    console.log('user after saved', user);
    const valid = await bcrypt.compare(password, user.password);
  if (valid) {
      res.status(200).json({ loggedIn: true });
    }
  } catch {
      console.error('user could not be retrieved');
  }
});



 module.exports = router;