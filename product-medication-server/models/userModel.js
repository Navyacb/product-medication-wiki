const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    userName:{
        type:String,
        unique : true,
        require : true
    },
    email:{
        type : String,
        unique: true,
        required: true
    },
    password : {
        type:String,
        required: true,
        minlength : 8,
        max_length : 128
    },
    role : {
        type : String,
        required : true,
        enum : ['admin'],
    }
})

const User = mongoose.model('User',userSchema)

module.exports = User