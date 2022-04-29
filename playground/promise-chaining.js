import "../src/db/mongoose.js"
import {User} from "../src/models/user.js"

// User.findByIdAndUpdate("623d8fd0f707093284288029",{
//     age:1}).then((user) => {
//         console.log(user)
//         return User.countDocuments({age:1})
//     }).then((result)=>{
//         console.log(result)
//     }).catch((e) => {
//         console.log(e)
//     })

const updateAgeAndCount = async (id,age) => {
    const user = await User.findByIdAndUpdate(id,{age})
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount("623d8fd0f707093284288029",2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})