//importing modules and packages
const express = require('express');
const inventoryModel = require('../models/inventory_model');
const authorize = require('../middleware/authorize');
const authenticate = require('../middleware/authenticate');

//Express router
const inventoryRouter = express.Router();

//route for creating new car details
inventoryRouter.post('/create',authenticate,authorize('dealer'),async(req,res)=>{
    try {
        const id = req.userId;
        const role = req.role;
        const {
            image,
            title,
            description,
            model_name,
            price,
            color,
            mileage,
            major_scratches,
            original_paint,
            accidents,
            previous_buyer,      
            registration_place
        } = req.body;

        if (!id || !role) {
            return res.status(400).json({
              success: false,
              error: "Bad Request",
              message: "Dealer must log in",
            });
        }
        const newCar = new inventoryModel({
            image,
            title,
            description,
            model_name,
            price,
            color,
            mileage,
            major_scratches,
            original_paint,
            accidents,
            previous_buyer,      
            registration_place,
            userId:id
        });
        await newCar.save();

        return res.status(201).json({
            success: true,
            message: "Car added successfully",
            data: newCar,
          });
    
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: "Internal Server Error",
            error: error.message,
          });
    }
});

//route for fetching all car details
inventoryRouter.get('/get',async(req,res)=>{
    try {
        let inventorydata = await inventoryModel.find();
        res.json({mssg:"inventory Details",data:inventorydata});
    } catch (error) {
        res.send(error.message);
    }

});

//route for updating car details with specific id
inventoryRouter.put('/update/:id',authenticate,authorize('dealer'),async(req,res)=>{
try {
    const role = req.role;
    const id = req.params.id;
    const data = req.body;
    if (role !== "dealer") {
        return res.status(403).json({
          success: false,
          message: "Unauthorized: Only dealers can perform this action",
        });
      }
  
      const updatedCar = await inventoryModel.findByIdAndUpdate(id, data, {
        new: true
      });
  
      if (!updatedCar) {
        return res.status(404).json({
          message: "Car not found",
        });
      }
  
      return res.status(200).json({
        message: "Car updated successfully",
        data: updatedCar,
      });
} catch (error) {
    res.send(error.message);
}
});

//route for delete multiple car
inventoryRouter.delete('/delete',authenticate,authorize('dealer'),async(req,res)=>{
    try {
        const role = req.role;
        const id = req.userId 
        const {ids} = req.body;

        if (role !== "dealer") {
      return res.status(403).json({
        message: "Unauthorized: Only dealers can perform this action",
      });
    }

    const deletedCars = await inventoryModel.deleteMany({
      _id: { $in: ids },
      userId: id,
    });

    if (!deletedCars.deletedCount) {
      return res.status(404).json({
        message: "No cars found for deletion,It's probably not your deal",
      });
    }

    return res.status(200).json({
      message: "Cars deleted successfully",
      data: deletedCars,
    });
    } catch (error) {
        res.send(error.message);
    }
});

// route for sorting cars by price from low to high and high to low
inventoryRouter.get('/price/:order',async(req,res)=>{
try {
    const order = req.params.order;
    let sortOrder;
    if(order === "HTL"){
        sortOrder = -1;
    }else if(order === "LTH"){
        sortOrder=1;
    }
    const filtered = await inventoryModel.find().sort({price:sortOrder})
    res.send(filtered);
} catch (error) {
    res.send(error.message);
}
});

//route for filter cars by color
inventoryRouter.get('/color/:color',async(req,res)=>{
try {
    const color = req.params.color;
    const selected = await inventoryModel.find({color:color});
    res.send(selected);
} catch (error) {
    res.send(error.message);
}
});

//routes for filter cars by mileage range
inventoryRouter.get('/mileage/:min/:max',async(req,res)=>{
    
    try {
       const min = req.params.min;
       const max = req.params.max;  
       const result = await inventoryModel.find({mileage:{$gte:min,$lte:max}});
       res.send(result);
    } catch (error) {
        res.send(error.message);
    }
})

//exporting inventory router
module.exports = inventoryRouter