const mongoose = require('mongoose');  //require() - method from node.js

const connectDB = (url) => {
    return mongoose.connect(url);     //from mongoose library - to connect with mongodb
}

module.exports=connectDB;             //module.exports - method from node.js