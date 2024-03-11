'use strict'

 const mongoose = require('mongoose');
// Connection URI
const {db:{host,port,name}} = require('../configs/config.mongodb')
const connectString = `mongodb://${host}:${port}/${name}`; 
console.log(connectString);
const {countConnect } = require('../helpers/check.connect')
// Connect to MongoDB
class Database {
    constructor(){
        this.connect();
    }
    //connect
    connect(type = 'mongodb'){
        if(1 === 1){
            mongoose.set('debug',true)
            mongoose.set('debug',{color:true})
        }
        mongoose.connect(connectString)
        .then( _ => { console.log('Connected Mongodb success'),countConnect()})
        .catch(err => console.log(`Error connect`))
    }
    static getInstance(){
        if(!Database.instance){
            Database.instance = new Database()
        }
        return Database.instance
    }
}

const instanceMongodb = Database.getInstance();



module.exports = instanceMongodb