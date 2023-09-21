const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

let Task = new taskController();

router.get('/tasks', Task.getAllTasks);
router.post('/tasks', Task.createTask);
router.get('/tasks/:id', Task.getTaskById);
router.patch('/tasks/:id', Task.updateTask);
router.delete('/tasks/:id', Task.deleteTask);

module.exports = router;
