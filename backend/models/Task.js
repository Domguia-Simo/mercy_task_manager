const mongoose = require('mongoose')
const Schema = mongoose.Schema

const task = new Schema({
    title:{type:String},
    description:{type:String},
    date:{type:Date ,default:Date.now()},
    status:{type:String ,enum:['pending' ,'done'] ,default:'pending'},
    created_at:{type:Date ,default:Date.now()}
})

const taskModel = mongoose.model("tasks", task)

module.exports = taskModel