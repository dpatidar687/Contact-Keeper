const express = require('express');
const router = express.Router();

const {check,validationResult}=require('express-validator');
const auth=require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact');

//@route GET api/contacts
//@desc Get all users contacts 
//@access Private
router.get('/',auth,async(req,res) =>{
  try{
    const contacts = await Contact.find({user: req.user.id}).sort({name:1});//ascending on the basis of name. 
    res.json(contacts);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route POST api/contacts
//@desc Add new contact 
//@access Private
//to implement multiple middlewares we need to write them into [auth,[check,express validator]]
router.post('/',[auth,[
  check('name','Name is required').not().isEmpty(),
  check('email','Enter Valid Email').isEmail()
  ]
],async(req,res) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }

  const {name,email,phone,type} = req.body;
  //number already exists
  const available = await Contact.findOne({user:req.user.id,phone:phone});
  if(available){
    return res.status(400).json({msg:'Phone Number already exists'});
  }

  try{
    const newContact = new Contact({
      name,
      email,
      phone,
      type,
      user:req.user.id
    });
    const contact = await newContact.save();
    res.status(200).json(contact);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }

});

//@route PUT api/contacts/:id
//@desc Update contact 
//@access Private
router.put('/:id',auth,(req,res) =>{
  // req.user.id//user ki id
  // req.params.id//contact ki id hai
  
  // await Contact.findByIdAndUpdate(req.params.id,req.body);

});

//@route DELETE api/contacts/:id
//@desc Delete contact 
//@access Private
router.delete('/:id',(req,res) =>{
  res.send('Delete contact');
  // await Contact.findByIdAndDelete(req.params.id);

});


module.exports = router;