import mongoose from "mongoose"
import "dotenv/config.js"

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.URI_MONGODB)
        console.log("Conectado con MongoDB!")
    } catch (error) {
        console.log("Error al conectarse con la DB: " + error.message)
    }
}

export default connectMongoDB