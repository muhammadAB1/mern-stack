import mongoose from "mongoose";
import { Login } from './Login.js'
import { Score } from './Score.js'
import { Quiz } from './Quiz.js'

mongoose.connect('mongodb+srv://muhammad:Digimon03.@cluster0.dek5f6q.mongodb.net/quiz?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('connected to DB'))
.catch(console.error())

export const db = {
    Login,
    Score,
    Quiz,
}
