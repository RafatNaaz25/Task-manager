import "../src/db/mongoose.js"
import {Task} from "../src/models/task.js"

// Task.findByIdAndDelete("623d92350c27cab3630abbee").then((task) => {
//         console.log(task)
//         return Task.countDocuments({completed: false})
//     }).then((result)=>{
//         console.log(result)
//     }).catch((e) => {
//         console.log(e)
//     })

const deletedTaskAndCount = async (id,completed) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed })
    return count
}

deletedTaskAndCount("623d9cf850dfc4b68313b4c1",false).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})