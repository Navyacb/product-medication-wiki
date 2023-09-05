const mongoose = require('mongoose')
const Schema = mongoose.Schema

const drugSchema = new Schema({
    name :{
        type : String,
        required : true
    },
    description :{
        type: String,
        required : true,
    },
    diseases: {
        type:[String],
        required: true,
    },
    released: {
        type : Date,
        required : true,
    },
  });

const Drug = mongoose.model('Drug',drugSchema)

module.exports = Drug
module.exports = drugSchema