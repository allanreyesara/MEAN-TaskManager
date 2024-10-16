import Task from "../Models/task.model.js"
import List from "../Models/list.model.js";

export const getTasks = async (req, res) => {
    try{
        const tasks = await Task.find({
            _listId: req.params.listId
        })

        res.status(201).json(tasks)
    }catch (err) {
        res.status(500).json({ error: "Internal server error "})
        console.log(err)
    }
}

export const createTask = async (req, res) => {
    try {
        const newTask = new Task({
            title: req.body.title,
            _listId: req.params.listId
        })
        await newTask.save();
        res.status(201).json(newTask)
    }catch (err) {
        res.status(500).json({ error: "Internal server error "})
        console.log(err)
    }
}

export const deleteTask = async (req, res) => {
    try {
        Task.findByIdAndDelete({
            _listId: req.params.listId,
            _id: req.params.taskId
        })

        res.status(201).json({ message: "Task deleted" })
    }catch (err) {
        res.status(500).json({ error: "Internal server error "})
        console.log(err)
    }
}

export const updateTask = async (req, res) => {
    try {
        console.log(`requested update for ${req.params.taskId}`)
        const taskId = req.params.taskId
        let task = await Task.findById( taskId )
        const {title, completed} = req.body
        task.title = title || task.title
        if(completed!==undefined) {
            task.completed = completed
        }
        await task.save();

        res.status(201).json({ message: `Task updated` })
    } catch (err) {
        res.status(500).json({ error: "Internal server error "})
        console.log(err)
    }
}