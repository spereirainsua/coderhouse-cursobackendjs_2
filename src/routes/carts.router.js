import express from "express"
import CartManager from "../CartManager.js"
import ProductManager from "../ProductManager.js"

const cartsRouter = express.Router()

const cartManager = new CartManager("./db/carts.JSON")
const productManager = new ProductManager("./db/products.JSON")

cartsRouter.post("/", (req, res) => {
    const carts = cartManager.createNewCart()
    if (carts) {
        res.status(201).send(carts)
    } else res.status(500).send({ message: "Error del servidor."})
})

cartsRouter.get("/:cid", (req, res) => {
    //Listar los productos que pertenezcan al carrito encontrado por su id
    const { cid } = req.params
    const cart = cartManager.getCartById(cid)
    if (cart) res.status(200).send(cart.products)
    else res.status(404).send(cart)
})

cartsRouter.post("/:cid/product/:pid", (req, res) => {
    // Agregar el producto encontrado con el pid al carrito con el cid, si existe el producto se debe sumar la cantidad sin generar duplicado
    // { id: 10, quantity: 2 }
    const { cid, pid } = req.params
    if (productManager.products.findIndex((product) => parseInt(product.pid) === parseInt(pid)) === -1) return res.status(400).send({ message: "Error, no existe el producto."})
    const isAdded = cartManager.addProductToCart(cid, pid)
    if (isAdded) return res.status(201).send(isAdded)
    else return res.status(500).send({ message: "Error, no se pudo agregar el producto."})
})

export default cartsRouter
