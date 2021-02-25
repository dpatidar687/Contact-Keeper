const express = require('express');
const router = express.Router();
//npm-validators to validate before entering it to the server
const {check,validationResult} = require('express-validator');

const bcrypt = require('bcryptjs');
const User=require('../models/User');

const jwt = require('jsonwebtoken');
const config = require('config');

//@route POST api/users
//@desc Register a user
//@access Public
router.post('/',[
  check('name','Please add name').not().isEmpty(),
  check('email','Please include a valid Email').isEmail(),
  check('password','Please enter a password with 6 or more characters').isLength({min:6})
],async(req,res) =>{
  const error = validationResult(req);
  if(!error.isEmpty()){
   return res.status(400).json({errors:error.array()})
  }
  
  const {name,email,password} = req.body;
  try{
    let user = await User.findOne({email:email});
    if(user){
     return res.status(400).json({msg:'User already Exists'});
    }
    
    user = new User({
      name,
      email,
      password
    });

    //generate salt for bcrypt
    const salt = await bcrypt.genSalt(10);
    //hash password
    user.password = await bcrypt.hash(password,salt);

    await user.save();
    
    const payload = {
      user:{
        id:user.id
      }
    }
    //creating webtoken
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        // expires in 1hr
        expiresIn: 3600
      },
      (err,token)=>{
        if(err) throw err;
        res.json({token});
      }
    );

  }catch(err){
    console.error(err.message);
    res.status(500).json({msg:'Server Error'});
  }
});

module.exports = router;