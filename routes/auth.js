const express = require('express');
const router = express.Router();

const User = require('../models/User');
const {check,validationResult} = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//to protect the route i.e. to check whether the req has token or not 
const auth = require('../middleware/auth');

//@route GET /api/auth
//@desc Get logged in user
//@access private
router.get('/',auth,async(req,res)=>{
  try{
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route POST /api/auth
//@desc  Auth user & get token
//@access public
router.post('/',
[
  check('email','Please insert a valid Email').isEmail(),
  check('password','Password is Required ').exists()
],
  async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
   }

  const {email,password}=req.body;
  try{
    let user = await User.findOne({email});
    if(!user){
     return res.status(400).json({msg:'Invalid Credentials'});
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(400).json({msg:'Invalid Credentials'});
    };

    //set jwt
    const payload = {
      user:{
        id:user.id
      }
    };
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn:3600
      },
      (err,token) =>{
        if(err) throw err;
        res.json({token});
      }
    )

  }catch(err){
    console.error(err.message);
    res.status(500).json({msg:'Server '});
  }
  

});


module.exports=router;
