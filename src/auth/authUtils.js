'use strict'
const JWT = require('jsonwebtoken')
// const createTokenPair = async (payload,publicKey,privateKey) =>{
//     try {
//         //accesstoken
//         const accessToken = await JWT.sign(payload,privateKey,{
//             algorithm: 'RS256',
//             expiresIn: '2 days'
//         })

//         const refreshToken = await JWT.sign(payload,privateKey,{
//             algorithm: 'RS256',
//             expiresIn: '7 days'
//         })

//         JWT.verify(accessToken,publicKey,(err,decode)=>{
//             if(err){
//                 console.error(`err verify::`, err)
//             }else{
//                 console.log(`decode verify`,decode);
//             }
//         })
//         return {accessToken,refreshToken}

        
//     } catch (error) {
        
//     }
// }

const createTokenPair = async ({ userId, email, publicKey, privateKey }) => {
    try {
        // Tạo payload cho token
        const payload = {
            userId: userId,
            email: email,
            // Thêm thông tin khác nếu cần
        };

        // Tạo AccessToken và RefreshToken bằng cách sử dụng khóa riêng tư
        const accessToken = JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2 days'
        });

        const refreshToken = JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7 days'
        });

        // Xác minh AccessToken bằng khóa công khai
        JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.error(`Error verifying accessToken:`, err);
            } else {
                console.log(`Decoded accessToken:`, decode);
            }
        });

        // Trả về cặp token
        return { accessToken, refreshToken };
    } catch (error) {
        console.error(`Error creating token pair:`, error);
        throw error;
    }
};


module.exports = {
    createTokenPair
}