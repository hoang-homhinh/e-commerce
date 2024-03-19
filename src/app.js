require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const app = express();

// console.log(`process:: `, process.env);
// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


//init db
require('./dbs/init.mongodb')
// const {checkOverload} = require('./helpers/check.connect')
//  checkOverload()
// init router
const router = require('./routes/index')
app.use('/',router)

//handling error

module.exports = app;