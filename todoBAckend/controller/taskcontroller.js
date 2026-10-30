const taskModel = require('../model/taskmodel');

//busines logic;
const getTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find();
        if(!tasks || tasks.length===0){
            res.json({
                message: "there is no tasks yet",
            })
        }
        res.status(200).json({
          tasksAre: tasks,
          suceess:true
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createTAsk = async (req, res) => {
    try {
        const newTask = new taskModel({ text: req.body.text });
        await newTask.save();
         res.status(200).json({
          taskAre: newTask,
          suceess:true
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
const deleteTask = async (req, res) => {
    const {id} = req.params;
    try {
        const deletedTask = await taskModel.findByIdAndDelete(id);

         res.status(200).json({
          taskAre: deletedTask,
          suceess:true
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports={getTasks, createTAsk, deleteTask};