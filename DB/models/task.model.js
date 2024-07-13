import { Schema, model } from "mongoose";

import mongoose from "mongoose";


const taskSchema = Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String
    },
    visibility:{
        type: String,
        enum: ['private', 'public'],
        default: 'public'
    },
    status: {
        type: String,
        enum: ['comming', 'ended'],
        default: 'comming'
    },
    dueDate: {
        type: Date
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    type:{
        type: String,
        enum: ['list', 'text']
    },
    items:[
        {   body: {
            type: String,
            required: true
            },
            dueDate: {
            type: Date,
            }
        }
    ],
    categoryId:{
        type: mongoose.Types.ObjectId,
        ref: 'category',
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    }    
}, { timestamps: true })


const Task = model('task', taskSchema)



export default Task