import CustomRouter from "../custom.router.js"
import { productsManager } from "../../data/ProductsManager.js"
import passportCallback from "../../middlewares/passportCallback.mid.js"

const createOne = async (req, res) => {
    const { title, price, stock, category, photo } = req.body
    if (!title || title.toString().trim() === '') {
        const error = new Error("Error al procesar los datos de la solicitud.")
        error.statusCode = 400
        throw error
    }
    const response = await productsManager.addProduct(title, price, stock, category, photo)
    res.status(201).json({
        response,
        method: req.method,
        url: req.originalUrl,
    })
}

const readAll = async (req, res) => {
    const { limit, page, sort, query } = req.query
    const url = req.protocol + '://' + req.get('host') + req.url
    const response = await productsManager.getProducts(url, limit, page, sort, query)
    if (response.length === 0) {
        const error = new Error("Not found")
        error.statusCode = 404
        throw error
    }
    res.status(200).json({
        response,
        method: req.method,
        url: req.originalUrl,
    })
}

const readById = async (req, res) => {
    const { pid } = req.params
    const response = await productsManager.getProductById(pid)
    if (!response) {
        const error = new Error("Not found")
        error.statusCode = 404
        throw error
    }
    res.status(200).json({
        response,
        method: req.method,
        url: req.originalUrl,
    })
}

const updateById = async (req, res) => {
    //Actualizar un producto a partir de su id, datos en el body
    const { pid } = req.params
    const data = req.body
    const product = await productsManager.readById(pid)
    if (!product) {
        const error = new Error("Not found")
        error.statusCode = 404
        throw error
    }
    const response = await productsManager.updateProduct(pid, data)
    res.status(200).json({
        response,
        method: req.method,
        url: req.originalUrl,
    })
}

const destroyById = async (req, res, next) => {
    //Eliminar un producto con el id ingresado
    const { pid } = req.params
    const response = await productsManager.getProductById(pid)
    if (!response) {
        const error = new Error("Not found")
        error.statusCode = 404
        throw error
    }
    await productsManager.deleteProduct(pid)
    res.status(200).json({
        response,
        method: req.method,
        url: req.originalUrl,
    })
}

class ProductsRouter extends CustomRouter {
    constructor() {
        super()
        this.init()
    }

    init = () => {
        this.validateId("pid")
        this.create("/", passportCallback("admin"), createOne)
        this.read("/", readAll)
        this.read("/:pid", readById)
        this.update("/:pid", passportCallback("admin"), updateById)
        this.destroy("/:pid", passportCallback("admin"), destroyById)
    }
}

const productsRouter = new ProductsRouter()

export default productsRouter.getRouter()