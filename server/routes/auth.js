const router=require("express").Router();
const User=require('../models/user');
const Admin=require('../models/admin');
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');

//register
router.post("/register",async(req,res)=>{
    
        try{
          const existingUser = await User.findOne({ 
            $or: [{ username: req.body.username }, { email: req.body.email }] 
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password, salt);
        const newUser=await new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        })

        const user=await newUser.save();
        res.status(200).json(user);
    }catch(err){
        console.log(err);
    }
});

router.post("/admin/register",async(req,res)=>{

    try{

          const existingAdmin = await Admin.findOne({ 
            $or: [{ username: req.body.username }, { email: req.body.email }] 
        });

        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password, salt);
        const newAdmin = await new Admin({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
            profession: req.body.profession,
            phoneNumber: req.body.phoneNumber,
        })

        const user=await newAdmin.save();
        res.status(200).json(user);
    }catch(err){
        console.log(err);
    }
});

//login

router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, role } = req.body;

  try {
    let user;

    if (role === 'admin') {
      user = await Admin.findOne({ email });
    } else if (role === 'user') {
      user = await User.findOne({ email });
    } else {
      return res.status(400).json({ message: 'Invalid role specified' });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: role, username: user.username },
      process.env.JWT_SECRET || '123wsedf',
      { expiresIn: '1h' }
    );

    const username = user.username;
    res.json({ token, role, username });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports=router;