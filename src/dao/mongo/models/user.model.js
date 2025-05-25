import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    photo: { type: String, default: "/img/user_default.png" },
    role: { type: String, default: "USER", enum: ["USER", "ADMIN", "PREMIUM"], index: true }
},
{ timestamps: true })


const User = mongoose.model("User", userSchema)

export default User