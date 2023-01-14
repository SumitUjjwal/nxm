const mongoose = require("mongoose");
require('dotenv').config()
mongoose.set('strictQuery', true); 


const connect = mongoose.connect(process.env.mongo_url);

module.exports = {
       connect
}