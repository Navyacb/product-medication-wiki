const mongoose = require('mongoose')
const Schema = mongoose.Schema
const drugSchema = require('./drugModel')

const medicineSchema = new Schema({
    drugs : [drugSchema]
  });

const Medication = mongoose.model('Medication',medicineSchema)

module.exports = Medication