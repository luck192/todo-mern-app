const {
  Schema,
  model
} = require("mongoose");

const taskSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TaskModel = model("taskData", taskSchema)

module.exports = TaskModel
