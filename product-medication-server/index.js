const express = require('express')
require('dotenv').config()
const cors = require('cors')
const configureDb = require('./configDatabase/configDb')
const medicationController = require('./controllers/medicationController')

const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
configureDb()

//api to fetch all the list of medication drugs
app.get('/medication',medicationController.list)

app.listen(PORT,()=>{
    console.log(`Server is up and running on port ${PORT}`)
})