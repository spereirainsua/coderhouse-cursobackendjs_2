import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    cartId: {
        type: String,
        default: ''
    },
    createdAt: { type: Date, default: Date.now }
})


const User = mongoose.model("User", userSchema)

export default User