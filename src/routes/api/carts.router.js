import CustomRouter from "../custom.router.js"
import passportCallback from "../../middlewares/passportCallback.mid.js"
import { createOne, readById, updateProductById, deleteProductById, deleteCart, getCartByUser} from "../../controllers/carts.controller.js"

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
