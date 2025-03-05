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

cartsRouter.put("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params
    const result = await cartManager.updateProductsInCart(cid, pid)
    if (result.status == "success") return res.status(201).send(result.payload)
    else return res.status(500).send(result)
})

cartsRouter.delete("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params
    const result = await cartManager.deleteProductsInCart(cid, pid)
    if (result.status == "success") return res.status(200).send(result)
    else return res.status(500).send(result)
})

cartsRouter.delete("/:cid", async (req, res) => {
    const { cid } = req.params
    const result = await cartManager.deleteCart(cid)
    if (result.status == "success") return res.status(200).send(result)
    else return res.status(500).send(result)
})

export default cartsRouter
