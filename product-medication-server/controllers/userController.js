const userController = {}
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const {pick} = require('lodash')
const jwt = require('jsonwebtoken')

userController.register = async(req,res)=>{
    try{
        const body = pick(req.body,['email','password','userName']) //sanitize the inputs
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(body.password,salt) // Hashing the password
        body.password = hash
        const userCount = await User.countDocuments()
        if(userCount == 0){
            body.role = 'admin'
        }
        const response = await User.create(body)
        res.send(response)
    }
    catch(error){
        res.json(error)
    }
}

userController.login = async(req,res)=>{
    try{
        const body = pick(req.body,['email','password'])
        const response = await User.findOne({email: body.email})
        if(response){
            const result = await bcrypt.compare(body.password,response.password)
            if(result){
                const tokenData = {
                    _id : response._id,
                    role : response.role
                }
                const token = jwt.sign(tokenData,process.env.JWT_SecretKey,{'expiresIn' : '7d'}) 
                res.json({
                    token:`bearer ${token}`
                })
            }else{
                res.status(404).send({'error':'Invalid email/password'})
            }
        }else{
            res.status(404).json({'error':'Invalid email/password'})
        }

    }
    catch(error){
        res.json(error)
    }
}

module.exports = userController