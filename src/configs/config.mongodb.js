'use strict'
const dev = {
    app:{
        port: process.env.PORT
    },
    db:{
        host: process.env.DB_HOST_DEV || 'localhost',
        port: process.env.DB_PORT_DEV || '27017',
        name: process.env.DB_NAME_DEV || 'aepv'
    }
}
const pro = {
    app:{
        port: process.env.PORT
    },
    db:{
        host: process.env.DB_HOST_PRO || 'localhost',
        port: process.env.DB_PORT_PRO || '27017',
        name: process.env.DB_NAME_PRO || 'product'
    }
}
const config = {dev , pro}
const db = process.env.DB_PRO || 'dev'
module.exports = config[db]