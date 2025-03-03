import express from "express"
import CartManager from "../CartManager.js"

const cartsRouter = express.Router()

const cartManager = new CartManager()

cartsRouter.post("/", async (req, res) => {
    const carts = await cartManager.createNewCart()
    if (carts.status == "success") {
        res.status(201).send(carts)
    } else res.status(500).send(carts)
})

cartsRouter.get("/:cid", async (req, res) => {
    //Listar los productos que pertenezcan al carrito encontrado por su id
    const { cid } = req.params
    const cart =  await cartManager.getCartById(cid)
    if (cart.status == "success") res.status(200).send(cart.payload)
    else res.status(404).send(cart)
})

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    // Agregar el producto encontrado con el pid al carrito con el cid, si existe el producto se debe sumar la cantidad sin generar duplicado
    // { id: 10, quantity: 2 }
    const { cid, pid } = req.params
    const result = await cartManager.addProductToCart(cid, pid)
    if (result.status == "success") return res.status(201).send(result.payload)
    else return res.status(500).send(result)
})

export default cartsRouter
