import mongoose from "mongoose"
import validator from "validator"

export const taskSchema = new mongoose.Schema({
    description: {
        type : String,
        required: true,
        trim: true
    },
    completed: {
        type : Boolean,
        default: false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    }
},{
    timestamps: true
})

export const Task = mongoose.model("Task",taskSchema)
