const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const process = require('process')

const app = express()

app.use(cors({origin:"*"}))
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/task")
.then(res => console.log("Connected to db"))
.catch(e => console.log(e))

const taskRoutes = require('./routes/taskRoutes')

const port= process.env.PORT

app.get("/" ,(req ,res)=>{
    return res.send("Welcome to Task manager")
})

app.use("/api/task" ,taskRoutes)


// app.get("*" ,(req ,res)=>{
//     return res.status(404).send("Not found")
// })

app.listen(port ,()=>{
    console.log("Server ruunnig on port "+port)
})