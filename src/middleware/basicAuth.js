// 'use strict'
// const User = ('../modules/users-models.js')
// const base64 = require('base-64')
// // const bcrypt = require('bcrypt');
// // const  router = express.Router();
// // const server = require('../server');

// async function basicAuth(req, res, next) {
//   // console.log("basicAuth")
  


//     let basicAuthParts = req.headers.authorization.split(' ') // authorization '2u98432:023j0jwf -> ['basic', '2u98432:023j0jwf']
     
//     let encodedUser = basicAuthParts.pop(); // username:password as base64 -> 2u98432:023j0jwf
//     let decoded = base64.decode(encodedUser); // username:password
    
//     // destructuring
//     let [username, password] = decoded.split(':'); // split at the : (username, password)
//     // console.log('user.....', decoded)
    

  
//     try{
//     const user = await User.authenticateBasic( username, password)

//       console.log('nassir')
//     console.log(".....", user)
//     // const valid = await bcrypt.compare(password, user.password);
    
   

//     if (valid) {
//       // res.status(200).json(user)
//        req.user = valid;
//        next()
//     } else {
//       next('Invalid User')
//     } 

//   }catch (error) { 
//     // res.status(403).send("Invalid Login");
//     next('invalid')
//    }
// }
// module.exports = basicAuth;
