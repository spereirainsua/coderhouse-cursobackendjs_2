import CustomRouter from "../custom.router.js"
import { cartsManager } from "../../data/CartsManager.js"
import passportCallback from "../../middlewares/passportCallback.mid.js"

const createOne = async (req, res) => {
    const response = await cartsManager.createNewCart(req?.user?._id)
    if (!response) {
        res.json404("Not created")
    }
    res.json201(response)
    
    // .status(201).json({
    //     response,
    //     method: req.method,
    //     url: req.originalUrl,
    // })
}

const readById = async (req, res) => {
    const { cid } = req.params
    const response = await cartsManager.getCartById(cid)
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

const updateProductById = async (req, res) => {
    const { cid, pid } = req.params
    const cart = await cartsManager.getCartById(cid)
    if (!cart) {
        res.json404()
    }
    const response = await cartsManager.updateProductsInCart(cart[0], pid)
    res.json200(response)
    
    // .status(200).json({
    //     response,
    //     method: req.method,
    //     url: req.originalUrl,
    // })
}

const deleteProductById = async (req, res) => {
    const { cid, pid } = req.params
    const cart = await cartsManager.getCartById(cid)
    if (!cart) {
        res.json404()
    }
    const response = await cartsManager.deleteProductsInCart(cart[0], pid)
    res.json200(response)
    
    // .status(200).json({
    //     response,
    //     method: req.method,
    //     url: req.originalUrl,
    // })
}

const deleteCart = async (req, res) => {
    const { cid } = req.params
    const cart = await cartsManager.getCartById(cid)
    if (!cart) {
        res.json404()
    }
    await cartsManager.deleteCart(cid)
    res.json200()
    
    // .status(200).json({
    //     response,
    //     method: req.method,
    //     url: req.originalUrl,
    // })
}

const getCartByUser = async (req, res) => {
    const user_id = req.user._id
    const response = await cartsManager.getCartByUid(user_id)
    if (!response) {
        res.json404()
    }
    res.json200(response[0])
    
    // .status(200).json({
    //     response: response[0],
    //     method: req.method,
    //     url: req.originalUrl,
    // })
}

class CartsRouter extends CustomRouter {
    constructor() {
        super()
        this.init()
    }

    init = () => {
        this.validateId("pid")
        this.validateId("cid")
        this.create("/", ["USER", "ADMIN"], passportCallback("current"), createOne)
        this.read("/getCart", ["USER", "ADMIN"], passportCallback("current"), getCartByUser)
        this.read("/:cid", ["USER", "ADMIN"], passportCallback("current"), readById)
        this.update("/:cid/product/:pid", ["USER", "ADMIN"], passportCallback("current"), updateProductById)
        this.destroy("/:cid/product/:pid", ["USER", "ADMIN"], passportCallback("current"), deleteProductById)
        this.destroy("/:cid", ["USER", "ADMIN"], passportCallback("current"), deleteCart)
    }
}

const cartsRouter = new CartsRouter()

export default cartsRouter.getRouter()
