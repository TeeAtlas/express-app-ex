import express from 'express';

const app = express();
const port = 8000;

//create instance of express and where function is invoked
app.get('/', (req, res) => {
    res.send('hello world')
});

app.use('/users', usersRouter);


//call back function to listen for port 8000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

