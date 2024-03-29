'use strict'
const keytokenModel = require('../models/keytoken.model')
class KeyTokenService{
    static createKeyToken = async ({userId,publicKey}) =>{
        try {
            const publicKeyString = publicKey.toString()
            const tokens = await keytokenModel.create({
                user: userId,
                publickey: publicKeyString
            })

            return  tokens ? tokens.publickey : null
        } catch (error) {
            return error
        }
    }
}

module.exports = KeyTokenService