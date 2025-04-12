import CustomRouter from "../custom.router.js"
import { productsManager } from "../../data/ProductsManager.js"
import passportCallback from "../../middlewares/passportCallback.mid.js"

const createOne = async (req, res) => {
    const { title, price, stock, category, photo } = req.body
    if (!title || title.toString().trim() === '') {
        res.json400()
    }
    const response = await productsManager.addProduct(title, price, stock, category, photo)
    res.json201(response)
    
    // .status(201).json({
    //     response,
    //     method: req.method,
    //     url: req.originalUrl,
    // })
}

const readAll = async (req, res) => {
    const { limit, page, sort, query } = req.query
    const url = req.protocol + '://' + req.get('host') + req.url
    const response = await productsManager.getProducts(url, limit, page, sort, query)
    if (response.length === 0) {
        res.json404()
    }
    res.json200(response)
    
    // .status(200).json({
    //     response,
    //     method: req.method,
    //     url: req.originalUrl,
    // })
}

const readById = async (req, res) => {
    const { pid } = req.params
    const response = await productsManager.getProductById(pid)
    if (!response) {
        res.json404()
    }
    res.json200(response)
    
    // .status(200).json({
    //     response,
    //     method: req.method,
    //     url: req.originalUrl,
    // })
}

const updateById = async (req, res) => {
    //Actualizar un producto a partir de su id, datos en el body
    const { pid } = req.params
    const data = req.body
    const product = await productsManager.readById(pid)
    if (!product) {
        res.json404()
    }
    const response = await productsManager.updateProduct(pid, data)
    res.json200(response)
    
    // .status(200).json({
    //     response,
    //     method: req.method,
    //     url: req.originalUrl,
    // })
}

const destroyById = async (req, res, next) => {
    //Eliminar un producto con el id ingresado
    const { pid } = req.params
    const response = await productsManager.getProductById(pid)
    if (!response) {
        res.json404()
    }
    await productsManager.deleteProduct(pid)
    res.json200()
    
    // .status(200).json({
    //     response,
    //     method: req.method,
    //     url: req.originalUrl,
    // })
}

class ProductsRouter extends CustomRouter {
    constructor() {
        super()
        this.init()
    }

    init = () => {
        this.validateId("pid")
        this.create("/", ["ADMIN"], createOne)
        this.read("/", ["PUBLIC"], readAll)
        this.read("/:pid", ["PUBLIC"], readById)
        this.update("/:pid", ["ADMIN"], updateById)
        this.destroy("/:pid", ["ADMIN"], destroyById)
    }
}

const productsRouter = new ProductsRouter()

export default productsRouter.getRouter()