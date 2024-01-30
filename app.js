import express from 'express';
import dotenv from 'dotenv';
import usersRouter from './routes/usersRouter.js';

dotenv.config();
const app = express();
const port = 8000;

app.use('/users', usersRouter);


//create instance of express and where function is invoked
app.get('/', (req, res) => {
    res.send('hello world')
});



//call back function to listen for port 8000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

