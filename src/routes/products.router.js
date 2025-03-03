import express from "express"
import ProductManager from "../ProductManager.js"

const productsRouter = express.Router()

const productManager = new ProductManager()

productsRouter.get("/", async (req, res) => {
    productManager.getProducts()
    .then(response =>{
        if (response.status == "success") res.status(200).send(response)
        else res.status(500).send(response)
    })
})

productsRouter.get("/:pid", async (req, res) => {
    //Capturar el id del producto, filtrar los productos y retornar el que coincida con pid
    const pid = req.params.pid
    const product = await productManager.getProductById(pid)
    product ? res.status(200).send(product) : res.status(404).send({ status: "error", message: "Error, no se pudo encontrar el producto."})
})

productsRouter.post("/", async (req, res) => {
    //Generar un nuevo producto
    const { title, description, code, price, stock, category, thumbnail } = req.body
    const statusOfReq = await productManager.addProduct(title, description, code, price, stock, category, thumbnail)
    res.status(statusOfReq.status).send(statusOfReq.message)
})

productsRouter.put("/:pid", async (req, res) => {
    //Actualizar un producto a partir de su id, datos en el body
    const { pid } = req.params
    const { title, description, price, thumbnail, code, stock, status } = req.body
    const result = await productManager.updateProduct(pid, title, description, price, thumbnail, code, stock, status)

    if (result.title) {
        res.status(201).send(result)
    } else {
        res.status(500).send(result)
    }
})

productsRouter.delete("/:pid", async (req, res) => {
    //Eliminar un producto con el id ingresado
    const { pid } = req.params
    const result = await productManager.deleteProduct(pid)

    if (result) {
        res.status(200).send({ status: "success", payload: result })
    } else {
        res.status(500).send({ status: "error", message: "Error al eliminar el producto." })
    }
})

export default productsRouter