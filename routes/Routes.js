const { Router } = require("express");
const mongoose = require("mongoose")
const User = require("../model/User");
const router = Router();
const {authSchema} = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const privateRouter = require("./privateRoute");


//sing up new user router
router.post("/signup", async (req, res) => {
  let { email, password } = req.body;
  
  //validate input value 
  const {error} = authSchema.validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  //Check if Email Exists
  const emailExists = await User.findOne({email});
  if(emailExists) return res.status(400).send('Email Already Exists');

  //Hash Password with bcrypt js
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  password = hashPassword

  //Create New User 
  const user = new User({
    email,
    password,
  })

  console.log({user : user._id});
  try {
    let saveUser = await user.save();
    res.send({user : user._id});
  } 
  
  catch(error) {
    throw error;
    res.status(400).send(error);
  }
 
});

//login user router 

router.post("/login", async(req, res) => {
  let { email, password } = req.body;
  
  //validate input value 
  const {error} = authSchema.validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  //Check if Email Exists
  const user = await User.findOne({email});
  if(!user) return res.status(400).send('Email or Password Wrong');  
  
  //password is correct
  const validPassword = await bcrypt.compare(password, user.password);
  if(!validPassword) return res.status(400).send('Invalid Password');

  //create jwt token 
  const token = jwt.sign({_id : user._id}, process.env.TOKEN_SECREAT);
  res.header('auth-token', token).send(token);

  res.send("Success")
})

router.get("/dashboard", privateRouter,(req, res)=> {
  res.send(req.user);
});

module.exports = router;
