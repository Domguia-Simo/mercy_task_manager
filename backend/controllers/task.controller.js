const taskModel = require('../models/Task')

// to create a task
const createTask =async(req ,res)=>{
    try{
        const {title ,description ,date ,status} = req.body
        console.log(req.body)
        const exists = await taskModel.findOne({date:date ,title:title})
        if(exists != null){
            return res.status(400).json({error:'Task already exists'})
        }
        const task = new taskModel({...req.body})
        task.save()
        return res.status(200).json({msg:'Task created successfully' ,task:task})
    }
    catch(e){
        console.log(e)
        return res.status(500).json({error:'Server errr'})
    }
}

// To get the list of tesks
const getTasks =async(req ,res)=>{
    try{
        const tasks = await taskModel.find().sort({status:'desc'})
        return res.status(200).json({tasks:tasks})
    }
    catch(e){
        console.log(e)
        return res.status(500).json({error:'Server errr'})
    }
}


const getTask =async(req ,res)=>{
    try{
        const {task_id} = req.params
        console.log(req.params)
        const task = await taskModel.findById({_id:task_id})
        return res.status(200).json({task:task})
    }
    catch(e){
        console.log(e)
        return res.status(500).json({error:'Server errr'})   
    }
}

// To update a task
const updateTask =async(req ,res)=>{
    try{
        const {task_id} = req.params
        const {title, description ,date ,status } = req.body
        console.log(req.body)

        const task = await taskModel.findById({_id:task_id})
        if(task == null){
            return res.status(404).json({error:'Task not found'})
        }
        task.title = title
        task.description = description
        task.status = status

        task.date = date

        await task.save()
        return res.status(200).json({msg:"task updated correctly"})
    }
    catch(e){
        console.log(e)
        return res.status(500).json({error:'Server errr'})
    }
}

// to delete a task
const deleteTask =async(req ,res)=>{
    try{
        const {task_id} = req.params
        const response = await taskModel.deleteOne({_id:task_id})
        return res.status(200).json({msg:'task deleted'})
    }
    catch(e){
        console.log(e)
        return res.status(500).json({error:'Server errr'})
    }
}


// done task
const doneTask =async(req ,res)=>{
    try{
        const {task_id} = req.params
        const response = await taskModel.findByIdAndUpdate({_id:task_id} ,{$set:{status:'done'}})
        return res.status(200).json({msg:'task done'})
    }
    catch(e){
        console.log(e)
        return res.status(500).json({error:'Server errr'})
    }
}

module.exports = {createTask ,getTasks ,getTask ,updateTask ,deleteTask ,doneTask}