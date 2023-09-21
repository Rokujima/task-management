const Task = require('../models/task');

class taskController {
    constructor() {

    }

    async getAllTasks(req, res) {
        try {
            const tasks = await Task.find();
            res.json(tasks);
          } catch (error) {
            res.status(500).json({ error: 'Server error' });
          }
    }

    async createTask(req, res) {
        const { title, description, completed } = req.body;
        try {
            const task = new Task({ title, description, completed });
            await task.save();
            res.status(201).json(task);
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    async getTaskById(req, res) {
        const taskId = req.params.id;
        try {
            const task = await Task.findById(taskId);
            if (!task) {
            return res.status(404).json({ error: 'Task not found' });
            }
            res.json(task);
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    async updateTask(req, res) {
        const taskId = req.params.id;
        const updateFields = req.body;
        try {
            const task = await Task.findByIdAndUpdate(taskId, updateFields, {
            new: true,
            });
            if (!task) {
            return res.status(404).json({ error: 'Task not found' });
            }
            res.json(task);
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    async deleteTask(req, res){
        const taskId = req.params.id;
        try {
            const task = await Task.findByIdAndRemove(taskId);
            if (!task) {
            return res.status(404).json({ error: 'Task not found' });
            }
            res.json({ message: 'Task deleted' });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }

}

module.exports = taskController;