import express from "express";
import {createTask, deleteTask, getTasks, updateTask} from "../controllers/task.controller.js";


const router = express.Router()

router.get('/:listId/tasks', getTasks)
router.post('/:listId/createTask', createTask)
router.put('/:listId/tasks/:taskId', updateTask)
router.delete('/:listId/tasks/:taskId', deleteTask)

export default router;