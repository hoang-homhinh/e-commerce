'use strict'

 const mongoose = require('mongoose');
// Connection URI
const connectString = `mongodb://localhost:27017/aepv`; 

// Connect to MongoDB
mongoose.connect(connectString).then( _ => console.log('Connected Mongodb success'))
.catch(err => console.log(`Error connect`))

//dev
if(1===0){
    mongoose.set('debug',true)
    mongoose.set('debug',{color:true})
}


module.exports = mongoose