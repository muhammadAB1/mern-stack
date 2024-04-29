const mongoose = require('mongoose')

const Schema = mongoose.Schema

const todoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        deafult: false
    }
})

const Todo = mongoose.model('todolist', todoSchema)

module.exports = Todo