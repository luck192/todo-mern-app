const express = require('express')
const router = express.Router()
const {createTAsk, getTasks, deleteTask} = require('../controller/taskcontroller')

router.get( '/getTasks', getTasks );
router.post( '/postTasks', createTAsk );
router.delete('/deletetask/:id', deleteTask);
module.exports = router;
