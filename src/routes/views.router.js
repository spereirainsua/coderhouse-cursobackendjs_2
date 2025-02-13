import express from "express"
import ProductManager from "../ProductManager.js"

const viewsRouter = express.Router()

const productManager = new ProductManager("./db/products.JSON")

export default function (io) {

    viewsRouter.get("/", (req, res) => {
        res.render("home", { style: "/home.css", layout: "main" })
    })

    viewsRouter.get("/realtimeproducts", (req, res) => {

        res.render("realTimeProducts", { style: "/realTimeProducts.css", layout: "main" })
    })

    //Websockets
    io.on("connection", (socket) => {
        //socket es un objeto que representa la conexion del cliente con el servidor
        console.log("Se conecto un nuevo usuario", socket.id)

        //Emitimos un evento desde el servidor hacia el cliente
        socket.emit("update products lists", productManager.getProducts())

        //Escuchamos un evento especifico
        socket.on("insert new product", ({ title, description, code, price, stock, category, thumbnail }) => {
            // const message = { id: socket.id, message: newMessage }
            const result = productManager.addProduct(title, description, code, price, stock, category, thumbnail)
            if (result == 201) io.emit("update products lists", productManager.getProducts())
            else io.emit("error update products")
        })

        socket.on("disconnect", (reason) => {
            console.log(`Desconectado: ${reason}`)
        })
    })

    return viewsRouter
}