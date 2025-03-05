import express from "express"
import ProductManager from "../ProductManager.js"
import CartManager from "../CartManager.js"
import User from "../models/user.model.js"

const viewsRouter = express.Router()

const productManager = new ProductManager()
const cartManager = new CartManager()

export default function (io) {

    viewsRouter.post("/register", async (req, res) => {
        try {
            const { user } = req.body
            if (user) {
                const existingUser = await User.findOne({ username: user })
                if (existingUser) {
                    res.status(201).send(existingUser)
                } else {
                    const cart = await cartManager.createNewCart()
                    const cartId = cart.payload.id
                    const result = await User.insertOne({ username: user, cartId })
                    res.status(201).send(result)
                }
            }
        } catch (error) {
            res.status(500).send({ status: "error", message: "Error del servidor: " + error.message })
        }
    })

    viewsRouter.get("/register", (req, res) => {
        res.render("register", { response: { status: true }, style: "register.css" })
    })

    viewsRouter.get("/", async (req, res) => {
        const { limit, page, sort, query } = req.query
        const url = req.protocol + '://' + req.get('host') + req.url
        const products = await productManager.getProducts(url, limit, page, sort, query)


        res.render("home", { title: "Vista de productos", products, style: "home.css", layout: "main" })
    })

    viewsRouter.get("/products/:pid", async (req, res) => {
        //Tener un enlace a su vista detallada en /products/:pid
        const pid = req.params.pid
        const product = await productManager.getProductById(pid)
        const status = product.status == "success"
        const stock = product.payload?.stock > 0
        res.render("viewProduct", { title: "Detalle de producto", product: product.payload, status, stock, style: "viewProduct.css", layout: "main" })
    })

    viewsRouter.get("/carts/:cid", async (req, res) => {
        const cid = req.params.cid
        try {
            const response = await cartManager.getCartById(cid)
            if (response.status == "success") {
                const cart = response.payload[0].products
                if (cart.length > 0) res.render("viewCart", { title: "Carrito de compras", status: true, cart, style: "viewCart.css", layout: "main" })
                else res.render("viewCart", { title: "Carrito de compras", status: false, style: "viewCart.css", layout: "main" })
            } else {
                res.render("viewCart", { title: "Carrito de compras", status: false, style: "viewCart.css", layout: "main" })
            }
        } catch (error) {
            console.log("Error: " + error.message)
            res.render("viewCart", { title: "Carrito de compras", status: false, style: "viewCart.css", layout: "main" })
        }
        
    })


    viewsRouter.get("/realtimeproducts", (req, res) => {
        res.render("realTimeProducts", { style: "realTimeProducts.css", layout: "main" })
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
            console.log(`Cliente ${socket.id} se ha desconectado: ${reason}`)
        })
    })

    return viewsRouter
}