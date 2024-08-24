const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    const { title, description, status, priority, due_date } = req.body;
    try {
        const task = new Task({
            title,
            description,
            status,
            priority,
            due_date,
            user_id: req.user.userId
        });
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user_id: req.user.userId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.updateTask = async (req, res) => {
    const { title, description, status, priority, due_date } = req.body;
    try {
        let task = await Task.findOne({ _id: req.params.taskId, user_id: req.user.userId });
        if (!task) return res.status(404).json({ msg: 'Task not found' });

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.priority = priority || task.priority;
        task.due_date = due_date || task.due_date;

        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        let task = await Task.findOne({ _id: req.params.taskId, user_id: req.user.userId });
        if (!task) return res.status(404).json({ msg: 'Task not found' });

        await task.remove();
        res.json({ msg: 'Task removed' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
