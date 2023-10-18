//exporting mongoose library
const mongoose = require('mongoose');

//designing schema for users
const userSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    role:{type:String,enum:["dealer", "buyer"],default:"buyer",required:true}
});

//creating model for users using schema
const userModel = mongoose.model('user', userSchema);

//exporting user model
module.exports = userModel;