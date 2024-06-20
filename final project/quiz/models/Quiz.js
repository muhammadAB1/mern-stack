import { Schema, model } from "mongoose";

const quizSchema = new Schema(
    {
        qid: {
            type: Number,                   
        },
        questions: {
            type: String,
        },
        answers: {
            type: Array,
        },
        right: {
            type: String,
        }

    }, {collection: 'quiz'}
)

export const Quiz = model("Quiz", quizSchema);