//nheim vu luu lai id usser , puckey, refreshToken nguoi do su dung

'use strict'

const { ObjectId } = require('mongodb');
const mongoose = require('mongoose'); // Erase if already required
const Schema = mongoose.Schema;

const DOCUMENT_NAME = 'Key'
const COLLECTION_NAME = 'Keys'
// Declare the Schema of the Mongo model
var keyTokenSchema = new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Shop'
    },
    publickey:{
        type:String,
        required:true       
    },
    refreshToken:{
        type:Array,
        default: []
    }
} , {
    collection: COLLECTION_NAME,
    timestamps:true
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, keyTokenSchema);