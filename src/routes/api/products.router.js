import CustomRouter from "../custom.router.js"
import { createOne, readAll, readById, updateById, destroyById } from "../../controllers/products.controller.js"

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