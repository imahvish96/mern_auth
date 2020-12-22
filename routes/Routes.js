const { Router } = require("express");
const mongoose = require("mongoose")
const User = require("../model/User");
const router = Router();
const joi = require("@hapi/joi");


const schema = {
  email  : joi.string().min(6).required().email(),
  password : joi.string().min(6).required(),
}


router.post("/signup", async (req, res) => {

  const validation = joi.valid(req.body, schema);
  res.send(validation);


  /* let { email, password } = req.body;
  const user = new User({
    email,
    password,
  })

  console.log(user);
  try {
    let saveUser = await user.save();
    res.send(saveUser);
  } 
  
  catch(error) {
    console.log(error);
    res.status(400).send(error);
  } */
 
});

module.exports = router;
