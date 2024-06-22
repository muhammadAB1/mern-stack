const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')

const app = express();

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://muhammad:Digimon03.@cluster0.dek5f6q.mongodb.net/todolist?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('connected to DB'))
.catch(console.error())

const Todo = require('./models/Todo')

app.get('/todos', async (req, res) => {
    const data = await Todo.find()

    res.json(data)
});


app.post('/todo/new', (req, res) => {
    if(req.body.text === '')return;
    const todo = new Todo({
        text: req.body.text
    })

    todo.save()
    res.json(todo)
});

app.delete('/todo/delete/:id', async (req, res) => {
    try{
    const data = await Todo.findByIdAndDelete(req.params.id)
    res.json(data);
    console.log(`deleted ${req.params.id}`)
    } catch(e){
        console.error(e)
    }
});

app.get('/todo/complete/:id', async (req, res) => {
    try {
        const data = await Todo.findById(req.params.id)
        data.complete = !data.complete
        data.save()
        res.json(data)
    } catch (error) {
        console.log(error)
    }

});

app.get('/todos/:id', async (req, res) => {
    const data = await Todo.findById(req.params.id)
    res.json(data)
})

app.listen(3001, () => console.log('server started on port 3001'));
