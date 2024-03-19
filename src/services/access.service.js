'use strict'
const shopModel = require('../models/shop.model')
const bcrypt = require("bcrypt")
const crypto = require('crypto')
const KeyTokenService = require('./keyToken.sevice')
const { createTokenPair } = require('../auth/authUtils')
const { getInfoData } = require('../utils')
const { filter } = require('lodash')
const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}
class AccessService {
    static signUp = async ({name,email,password}) =>{
        try {
            //step1: check su ton tai cua email
            const holdelShop = await shopModel.findOne({email}).lean()
            if (holdelShop) {
                return{
                    code:'xxx',
                    message: 'Shop already registered!'
                }
            }
            const passwordHash = await bcrypt.hash(password,10)
            const newShop = await shopModel.create({
                name,email,password: passwordHash,roles : [RoleShop.SHOP]
            })
   
            if (newShop) {
                //created privatekey : dung de sign tocken, publickey: dung de verify tocken
                const publicKey = crypto.randomBytes(64).toString('hex')
                const privateKey = crypto.randomBytes(64).toString('hex')
                const keyStore = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey
                })

                if(!keyStore){
                    return{
                        code:'xxxx',
                        message: 'keyStore error'
                    }
                }
                const tokens = await createTokenPair({userId: newShop._id,email},publicKey,privateKey)
                console.log(`create Token Succsess::`, tokens);

                return {
                    code : 201,
                    metadata: {
                        shop: getInfoData({fileds: ['_id', 'name', 'email'],Object:newShop}),
                        tokens
                    }
                }
               
            }
            return {
                code: 200,
                metadata:null
            }
            
        } catch (error) {
            console.error(error);
            return{
                code:'xxx',
                message: error.message,
                status:'error'
            }
        }
    }
}

module.exports = AccessService