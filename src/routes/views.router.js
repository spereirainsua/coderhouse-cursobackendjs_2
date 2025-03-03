import express from "express"
import ProductManager from "../ProductManager.js"

const viewsRouter = express.Router()

const productManager = new ProductManager()

export default function (io) {

    viewsRouter.get("/", (req, res) => {
        const products = productManager.getProducts()
        res.render("home", { products, style: "/home.css", layout: "main" })
    })

    viewsRouter.get("/realtimeproducts", (req, res) => {

        res.render("realTimeProducts", { style: "/realTimeProducts.css", layout: "main" })
    })

    //Websockets
    io.on("connection", (socket) => {
        console.log("Cliente conectado", socket.id)

        socket.emit("update products lists", productManager.getProducts())

        socket.on("insert new product", ({ title, description, code, price, stock, category, thumbnail }) => {
            const result = productManager.addProduct(title, description, code, price, stock, category, thumbnail)
            if (result == 201) {
                io.emit("update products lists", productManager.getProducts())
                console.log("Se ha ingresado un nuevo producto")
            }
            else socket.emit("error insert products", { message: "Error al agregar nuevo producto" })
        })

        socket.on("delete product", (productId) => {
            const result = productManager.deleteProduct(productId)
            if (result == 1) {
                io.emit("update products lists", productManager.getProducts())
                console.log("Se ha eliminado un producto")
            }
            else socket.emit("error delete products", { message: "Error al eliminar producto" })
        })

        socket.on("disconnect", (reason) => {
            console.log(`Cliente ${ socket.id } se ha desconectado: ${reason}`)
        })
    })

    return viewsRouter
}