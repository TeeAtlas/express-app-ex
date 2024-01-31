import express from 'express';
import dotenv from 'dotenv';
import usersRouter from './routes/usersRouter.js';

dotenv.config();
const app = express();
const port = 8000;


//make sure to use this midddleware to parse json bodies
app.use(express.json());
app.use('/users', usersRouter);


//create instance of express and where function is invoked
app.get('/', (req, res) => {
    res.send('hello world')
});

    // app.all('/secret', (req, res, next) => {
    //     console.log('Accessing the secret section ...')
    //     next() // pass control to the next handler
    //   })



//call back function to listen for port 8000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

