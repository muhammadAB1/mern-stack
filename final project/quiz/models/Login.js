import { Schema, model } from "mongoose";

const loginSchema = new Schema(
    {
        username:{
            type: 'String'
        },
        password: {
            type: 'String'
        },
        user: {
            type: 'String'
        },
    }, {collection: 'login'}
)

export const Login = model("Login", loginSchema);