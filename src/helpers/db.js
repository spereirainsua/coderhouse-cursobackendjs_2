import mongoose from "mongoose"

const connectMongoDB = async (URI) => {
    try {
        await mongoose.connect(URI)
        console.log("Conectado con MongoDB!")
    } catch (error) {
        console.log("Error al conectarse con la DB: " + error.message)
    }
}

export default connectMongoDB