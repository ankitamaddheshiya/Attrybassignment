//importing modules
require('dotenv').config();
const mongoose = require('mongoose');

//establishing connection for database
const connection = mongoose.connect(process.env.mongo_url)

//exporting connection
module.exports = connection