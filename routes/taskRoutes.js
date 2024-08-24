const express = require('express');
const {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} = require('../controllers/taskController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/tasks', auth, createTask);
router.get('/tasks', auth, getTasks);
router.put('/tasks/:taskId', auth, updateTask);
router.delete('/tasks/:taskId', auth, deleteTask);

module.exports = router;
