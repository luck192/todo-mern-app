const express = require('express');
const cors = require('cors');
const PORT = 3000;
const connectDB = require('./databse/db');
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


const router = require('./routes/tasksroutes');

app.use('/api', router);


app.listen(PORT, () => {
    console.log("Server is on");
});