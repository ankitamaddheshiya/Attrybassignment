//required modules and packages
const express = require('express');
const { use } = require('./Inventory');
const userModel = require('../models/user_model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//express router
const userRouter = express.Router();

//route for signup
userRouter.post('/signup',async(req,res)=>{
const {username,email,password,role} = req.body;
const user = await userModel.findOne({username});
if(user){
    res.send("user already exists")
}
const newUser = new userModel({
    username,email,password,role
}); 
await newUser.save();

return res.send("user created")
})

//route for login
userRouter.post('/login',async(req,res)=>{
    const {username,password} = req.body;
    const user = await userModel.findOne({username});

    if (!user) {
       res.send({ message: 'Invalid credentials' });
    }
  
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.key);
  
    res.json({ token:token,role:user.role,mssg:"login successfull" });
    
    
});

//exporting user Router
module.exports = userRouter


