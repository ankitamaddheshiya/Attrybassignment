//packages and modules
const express = require('express');
const connection = require('./config/db');
const inventoryRouter = require('./routes/Inventory');
const oemRouter = require('./routes/oem');
const userRouter = require('./routes/user');
require('dotenv').config();

//express application
const app = express();

//parsing json data
app.use(express.json());

//all routes
app.use("/inventory", inventoryRouter)
app.use("/oem", oemRouter);
app.use("/user", userRouter);

//home route
app.get('/', async(req,res)=>{
res.send("welcome to BuycCorp");
})

//listening server and database connection
app.listen(process.env.port,async()=>{
try {
    console.log('listening on port '+process.env.port);
    await connection
    console.log("successfully connected to db")
} catch (err) {
    console.log(err)
}
})