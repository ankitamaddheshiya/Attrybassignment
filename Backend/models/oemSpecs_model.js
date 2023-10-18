//exportingmongoose library
const mongoose = require('mongoose');

//designing schema for OEM Specification
const oemSchema = mongoose.Schema({
    model_name:String,
    year:Number,
    listPrice:Number,
    available_colors:String,
    mileage:Number,
    bhp:Number,
    max_speed:Number
});

//creating model for oemSpecification using oemSchema
const oemModel = mongoose.model('OEM_Specs', oemSchema);

//exporting oem model
module.exports = oemModel;