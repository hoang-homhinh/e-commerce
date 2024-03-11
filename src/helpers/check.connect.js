'use strict'

const mongoose = require('mongoose')
const _SECONDS = 5000
const os = require('os')
const process = require('process')
//count connect
const countConnect = () => {
    const numConnection = mongoose.connections.length
    console.log(`number of connection ${numConnection}`);
}

//check over load
const checkOverload = () => {
    setInterval( ()=>{
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;

        const maxConnections = numCores * 5 ;
        console.log(`Active connections : ${numConnection}`);
        console.log(`memory usage : ${memoryUsage/1024/104} mb`);
        if(numConnection > maxConnections) {
            console.log("Connection overloaf detected");
        }
    },_SECONDS)
}

module.exports = {
    countConnect,
    checkOverload
}