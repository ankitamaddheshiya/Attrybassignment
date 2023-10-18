//importing mongoose library
const mongoose = require('mongoose');

//designing schema for inventory
const inventorySchema = mongoose.Schema({
    image:String,
    title:String,
    description:String,
    model_name:String,
    price:Number,
    color:String,
    mileage:Number,
    major_scratches:Number,
    original_paint:String,
    accidents:Number,
    previous_buyer:Number,      
    registration_place:String,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    }
});

//creating model for inventory using schema
const inventoryModel = mongoose.model('MarketPlace_Inventory', inventorySchema);

//exporting inventory model
module.exports =inventoryModel;