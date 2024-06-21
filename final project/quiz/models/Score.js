import { Schema, model } from "mongoose";

const scoreSchema = new Schema(
    {
        username:{
            type: 'String'
        },
        qid: {
            type: 'Number'
        },
        score: {
            type: 'number'
        }

    }, {collection: 'score'}
)

export const Score = model("Score", scoreSchema);