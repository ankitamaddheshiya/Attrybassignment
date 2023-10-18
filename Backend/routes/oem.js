//importing modules and packages
const express = require('express');
const oemModel = require('../models/oemSpecs_model');

//Express Router
const oemRouter = express.Router();

//OEM Specifications creating route
oemRouter.post('/create',async(req,res)=>{
    try {
        oemModel.create(req.body);
        res.send("created successfully");  
    } catch (error) {
        res.send(error.message);
    }

});

//route for fetching OEM specifications
oemRouter.get('/get',async(req,res)=>{
    try {
        let oemdata = await oemModel.find();
        res.send({mssg:"oemSpecs Details",data:oemdata});
    } catch (error) {
        res.send(error.message);
    }

});

//route for searching OEM specifications by model and year
oemRouter.get('/search',async(req,res)=>{
    try {
        const {model,year} = req.query;
        const matched = await oemModel.find({model_name:model,year:year})

        if(matched.length === 0){
            res.json({message: "No matches found"})
        }
        res.json(matched);
    } catch (error) {
        res.send(error.message);
    }
});

//exporting oemRouter
module.exports = oemRouter