import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import{Task} from "./task.js"

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid!")
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Age must be a positive number!")
            }
        }
    },
    tokens:[{
        token:{
            type: String,
            required: true,
        }
    }],
    avatar:{
        type: Buffer
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("Password cannot contain Password")
            }
        }

    }
},{
    timestamps: true
})

userSchema.virtual("tasks",{
    "ref": "Task",
    "localField": "_id",
    "foreignField": "owner"
})

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString()},process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({ email})

    if(!user){
        throw new Error("Unable to login")
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new Error("Unable to login")
    }
    return user
}

userSchema.pre("save", async function(next){
    const user = this
    
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

userSchema.pre("remove", async function(next){
    const user = this
    await Task.deleteMany({"owner":user._id})
    next()
})


export const User = mongoose.model("User",userSchema)