const Medication = require('../models/medicationModel')
const medicationController = {}

medicationController.list = async(req,res)=>{
    try{
        const response = await Medication.find()
        res.json(response)
    }
    catch(error){
        res.json(error)
    }
}


module.exports = medicationController
  