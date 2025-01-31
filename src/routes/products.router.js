import express from "express"
import ProductManager from "../ProductManager.js"

const productsRouter = express.Router()

const productManager = new ProductManager("./db/products.JSON")

productsRouter.get("/", (req, res) => {
    //Leer archivo de productos y devolverlos
    res.status(200).send(productManager.getProducts())
})

productsRouter.get("/:pid", (req, res) => {
    //Capturar el id del producto, filtrar los productos y retornar el que coincida con pid
    const pid = req.params.pid
    res.status(200).send(productManager.getProductById(pid))
})

productsRouter.post("/", (req, res) => {
    //Generar un nuevo producto
    const { title, description, price, thumbnail, code, stock } = req.body
    productManager.addProduct(title, description, price, thumbnail, code, stock)
    res.status(201).send(productManager.getProducts())
})

productsRouter.put("/:pid", (req, res) => {
    //Actualizar un producto a partir de su id, datos en el body
    const { pid } = req.params
    const { title, description, price, thumbnail, code, stock } = req.body
    const result = productManager.updateProduct(pid, title, description, price, thumbnail, code, stock)
    if (result.index >= 0 && result.message === "Producto actualizado") return res.status(201).send(productManager.getProducts())

    switch (result.index) {
        case -1:
            res.status(404).send(result)
            break;
        case -3:
            res.status(500).send(result)
            break;
        default:
            res.status(400).send(result)
            break;
    }
})

productsRouter.delete("/:pid", (req, res) => {
    //Eliminar un producto con el id ingresado
    const { pid } = req.params
    const result = productManager.deleteProduct(pid)
    switch (result) {
        case 1:
            res.status(200).send(productManager.getProducts())
            break;
        case -1:
            res.status(404).send({ message: "Error, no se pudo encontrar el producto."})
            break;
        default:
            res.status(400).send({ message: "Error, solicitud no valida."})
            break;
    }
})

export default productsRouter