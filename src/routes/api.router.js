import CustomRouter from "./custom.router.js"
import productsRouter from "./api/products.router.js"
import cartsRouter from "./api/carts.router.js"
import authRouter from "./api/auth.router.js"
import usersRouter from "./api/users.router.js"

class APIRouter extends CustomRouter {
    constructor() {
        super()
        this.init()
    }

    init = () => {
        this.use("/auth", authRouter)
        this.use("/carts", cartsRouter)
        this.use("/products", productsRouter)
        this.use("/users", usersRouter)
    }
}

const apiRouter = new APIRouter()

export default apiRouter.getRouter()