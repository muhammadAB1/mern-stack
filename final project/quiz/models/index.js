import mongoose from "mongoose";
import { Login } from './Login.js'
import { Score } from './Score.js'
import { Quiz } from './Quiz.js'

mongoose.connect('mongodb://localhost:27017/quiz')
.then(() => console.log('connected to DB'))
.catch(console.error())

export const db = {
    Login,
    Score,
    Quiz,
}
