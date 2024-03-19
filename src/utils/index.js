'use strict'

const _ = require('lodash')
const getInfoData = ({fileds = [],Object = {}}) =>{
    return _.pick(Object,fileds)
}

module.exports={
    getInfoData
}