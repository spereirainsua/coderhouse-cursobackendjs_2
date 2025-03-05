import express from "express"
import ProductManager from "../ProductManager.js"

const productsRouter = express.Router()

const productManager = new ProductManager()

productsRouter.get("/", async (req, res) => {
    const { limit, page, sort, query } = req.query
    const url = req.protocol + '://' + req.get('host') + req.url
    productManager.getProducts(url, limit, page, sort, query)
        .then(response => {
            if (response.status == "success") {
                res.status(200).send(response)
            } else res.status(500).send(response)
        }).catch(error => {
            res.status(500).send({ status: "error", message: "Error al realizar la consulta " + error.message })
        })
})

productsRouter.get("/:pid", async (req, res) => {
    const pid = req.params.pid
    const result = await productManager.getProductById(pid)
    result.status == "success" ? res.status(200).send(result) : res.status(500).send(result)
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