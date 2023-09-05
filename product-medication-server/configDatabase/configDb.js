const mongoose = require('mongoose')

const configureDb = async()=>{
    try{
        const response = await mongoose.connect('mongodb://localhost:27017/product-medication-list')
        console.log('db is connected')
    }
    catch(error){
        console.log('error while connecting DB',error)
    }
}

module.exports = configureDb

