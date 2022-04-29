import express from "express"
import "./db/mongoose.js"
import {userRouter} from "../src/routers/user.js"
import {taskRouter} from "../src/routers/task.js"
import multer from "multer"

const app = express()
const port = process.env.PORT 

const upload = multer({
    dest: "images",
    limits:{
        fileSize: 100000
    },
    fileFilter(req,file,cb){
        console.log(file)
        if(!file.originalname.match(/\.(doc|docx)$/)){
            cb(new Error("Please upload a word document"))
        }
        cb(undefined,true)
    }
})
app.post("/upload",upload.single("upload"),(req,res)=>{
    res.send()
},(error,req,res,next) => {
    res.status(400).send({error: error.message})
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log("Server is up on port "+port)
}) 

import {Task} from "./models/task.js"
import {User} from "./models/user.js"

// const main = async() =>{
//     // const task = await Task.findById("625b1a9dbe208cc184fd9567")
//     // await task.populate("owner")
//     // console.log(task.owner)

//     // const user = await User.findById("625b1a25be208cc184fd955a")
//     // await user.populate("tasks")
//     // console.log(user.tasks)
// }

// main()