const express = require('express')
require('dotenv').config()
const cors = require('cors')
const configureDb = require('./configDatabase/configDb')
const medicationController = require('./controllers/medicationController')
const userController = require('./controllers/userController')

const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
configureDb()

//api to fetch all the list of medication drugs
app.get('/medication',medicationController.list)

//api to register a user as admin
app.post('/register',userController.register)

//api to login a user as admin

app.post('/login',userController.login)

app.listen(PORT,()=>{
    console.log(`Server is up and running on port ${PORT}`)
})