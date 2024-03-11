'use strict'
const shopModel = require('../models/shop.model')
const bcrypt = require("bcrypt")
const crypto = require('crypto')
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
                name,email,passwordHash,roles : [RoleShop.SHOP]
            })
   
            if (newShop) {
                //created privatekey : dung de sign tocken, publickey: dung de verify tocken
                const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096, // Độ dài của modulo (n), tính bằng bit, mặc định là 2048
                    publicKeyEncoding: {
                        type: 'pkcs1', // Loại mã hóa của khóa công khai (hoặc 'spki' cho ECC)
                        format: 'pem' // Định dạng đầu ra (ví dụ: 'pem', 'der')
                    },
                    privateKeyEncoding: {
                        type: 'pkcs1', // Loại mã hóa của khóa riêng tư (hoặc 'sec1' cho ECC)
                        format: 'pem', // Định dạng đầu ra (ví dụ: 'pem', 'der')
                        cipher: 'aes-256-cbc', // Thuật toán mã hóa dùng để bảo vệ khóa riêng tư
                        passphrase: 'yourPassphrase' // Passphrase để mã hóa khóa riêng tư (tùy chọn)
                    }
                });
                console.log(publicKey);
                console.log(privateKey);
            }
            
        } catch (error) {
            return{
                code:'xxx',
                message: error.message,
                status:'error'
            }
        }
    }
}

module.exports = AccessService