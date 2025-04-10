import CustomRouter from "../custom.router.js"
import { cartsManager } from "../../data/CartsManager.js"
import passportCallback from "../../middlewares/passportCallback.mid.js"

const createOne = async (req, res, next) => {
    const response = await cartsManager.createNewCart()
    res.status(201).json({
        response,
        method: req.method,
        url: req.originalUrl,
    })
}

const readById = async (req, res, next) => {
    const { cid } = req.params
    const response = await cartsManager.getCartById(cid)
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

const updateProductById = async (req, res, next) => {
    const { cid, pid } = req.params
    const cart = await cartsManager.getCartById(cid)
    if (!cart) {
        const error = new Error("Not found")
        error.statusCode = 404
        throw error
    }
    const response = await cartsManager.updateProductsInCart(cart[0], pid)
    res.status(200).json({
        response,
        method: req.method,
        url: req.originalUrl,
    })
}

const deleteProductById = async (req, res, next) => {
    const { cid, pid } = req.params
    const cart = await cartsManager.getCartById(cid)
    if (!cart) {
        const error = new Error("Not found")
        error.statusCode = 404
        throw error
    }
    const response = await cartsManager.deleteProductsInCart(cart[0], pid)
    res.status(200).json({
        response,
        method: req.method,
        url: req.originalUrl,
    })
}

const deleteCart = async (req, res, next) => {
    const { cid } = req.params
    const cart = await cartsManager.getCartById(cid)
    if (!cart) {
        const error = new Error("Not found")
        error.statusCode = 404
        throw error
    }
    const response = await cartsManager.deleteCart(cid)
    res.status(200).json({
        response,
        method: req.method,
        url: req.originalUrl,
    })
}

class CartsRouter extends CustomRouter {
    constructor() {
        super()
        this.init()
    }

    init = () => {
        this.validateId("pid")
        this.validateId("cid")
        this.create("/", passportCallback("current"), createOne)
        this.read("/:cid", passportCallback("current"), readById)
        this.update("/:cid/product/:pid", passportCallback("current"), updateProductById)
        this.destroy("/:cid/product/:pid", passportCallback("current"), deleteProductById)
        this.destroy("/:cid", passportCallback("current"), deleteCart)
    }
}

const cartsRouter = new CartsRouter()

export default cartsRouter.getRouter()
