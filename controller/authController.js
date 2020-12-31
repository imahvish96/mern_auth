const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authSchema } = require('../validation');
const User = require('../model/User');

module.exports.login_get = (req, res) => {
  res.render('login');
};

module.exports.signup_get = (req, res) => {
  res.render('signup');
};

module.exports.dashboard_get = (req, res) => {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.render('dashboard');
};

module.exports.logout_get = (req, res) => {
  res.cookie('Oauth_token', '', { maxAge: 1 });
  res.redirect('login');
};

module.exports.signup_post = async (req, res) => {
  let { email, password } = req.body;

  //validate input value
  const { error } = authSchema.validate(req.body);
  if (error) {
    req.flash('error_msg', error.details[0].message);
    res.redirect('signup');
  }

  //Check if Email Exists
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    req.flash('error_msg', 'Email Already Exists');
    res.redirect('signup');
  }

  //Hash Password with bcrypt js
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  password = hashPassword;

  //Create New User
  const user = new User({ email, password });
  console.log({ user: user._id });
  try {
    let saveUser = await user.save();
    res.redirect('login');
  } catch (error) {
    throw error;
  }
};

module.exports.login_post = async (req, res) => {
  let { email, password } = req.body;

  //validate input value
  const { error } = authSchema.validate(req.body);
  if (error) {
    req.flash('error_msg', error.details[0].message);
    res.redirect('login');
  }
  //Check if Email Exists
  const user = await User.findOne({ email });
  if (!user) {
    req.flash('error_msg', 'Email or Password Wrong');
    res.redirect('login');
  }

  //password is correct
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    req.flash('error_msg', 'Invalid Password');
    res.redirect('login');
  } else {
    //create jwt token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECREAT);
    res.cookie('Oauth_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
    res.status(200).redirect('dashboard');
  }
};
