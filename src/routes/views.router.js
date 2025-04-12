import CustomRouter from "./custom.router.js"
import { productsManager } from "../data/ProductsManager.js"
import { cartsManager } from "../data/CartsManager.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"

const viewLogin = (req, res) => {
    res.render("login", { style: "login.css" })
}

const viewRegister = (req, res) => {
    res.render("register", { style: "register.css" })
}

const viewHome = async (req, res) => {
    const authenticated = req.user != null
    const { limit, page, sort, query } = req.query
    const url = req.protocol + '://' + req.get('host') + req.url
    const products = await productsManager.getProducts(url, limit, page, sort, query)
    res.render("home", { title: "Vista de productos", products, authenticated, style: "home.css", layout: "main" })
}

const viewProduct = async (req, res) => {
    //Tener un enlace a su vista detallada en /products/:pid
    const authenticated = req.user != null
    const pid = req.params.pid
    const product = await productsManager.getProductById(pid)
    const status = product ? true : false
    const stock = product?.stock > 0
    res.render("viewProduct", { title: "Detalle de producto", product: product, authenticated, status, stock, style: "viewProduct.css", layout: "main" })
}

const viewCart = async (req, res) => {
    const authenticated = req.user != null
    const cid = req.params.cid
    try {
        const response = await cartsManager.getCartById(cid)
        if (!response) {
            const error = new Error("Not found")
            error.statusCode = 404
            throw error
        }
        const cart = response[0].products
        if (cart.length > 0) res.render("viewCart", { title: "Carrito de compras", status: true, authenticated, cart, style: "viewCart.css", layout: "main" })
        else res.render("viewCart", { title: "Carrito de compras", status: false, authenticated, style: "viewCart.css", layout: "main" })
    } catch (error) {
        console.log("Error: " + error.message)
        res.render("viewCart", { title: "Carrito de compras", status: false, authenticated, style: "viewCart.css", layout: "main" })
    }
}


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
    }
}

const viewsRouter = new ViewsRouter()

export default viewsRouter.getRouter()
