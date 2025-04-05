const express = require('express')
const router = express.Router()
const { createTask, getTasks, getTask, updateTask, deleteTask, doneTask } = require('../controllers/task.controller')

router.route("/")
.post(createTask)
.get(getTasks)

router.route("/:task_id")
.get(getTask)
.put(updateTask)
.delete(deleteTask)

router.route("/done/:task_id").get(doneTask)

module.exports = router