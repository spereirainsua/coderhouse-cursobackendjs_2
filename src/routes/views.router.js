import CustomRouter from "./custom.router.js"
import { viewLogin, viewRegister, viewHome, viewProduct, viewCart, isAuthenticated, viewVerify, viewPasswordRecovery, viewResetPassword } from "../controllers/views.controller.js"


class ViewsRouter extends CustomRouter {
    constructor() {
        super()
        this.init()
    }

    init = () => {
        this.read("/", ["PUBLIC"], isAuthenticated, viewHome)
        this.read("/login", ["PUBLIC"], isAuthenticated, viewLogin)
        this.read("/register", ["PUBLIC"], isAuthenticated, viewRegister)
        this.read("/products/:pid", ["PUBLIC"], isAuthenticated, viewProduct)
        this.read("/carts/:cid", ["USER", "ADMIN"], isAuthenticated, viewCart)
        this.read("/verify", ["PUBLIC"], isAuthenticated, viewVerify)
        this.read("/passwordRecovery", ["PUBLIC"], isAuthenticated, viewPasswordRecovery)
        this.read("/resetPassword/:code", ["PUBLIC"], isAuthenticated, viewResetPassword)
    }
}

const viewsRouter = new ViewsRouter()

export default viewsRouter.getRouter()
