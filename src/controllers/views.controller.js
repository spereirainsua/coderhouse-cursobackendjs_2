import dao from "../dao/index.factory.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { productsService } from "../services/products.services.js"

const { PERSISTENCE } = process.env
const { cartsManager } = dao

const viewLogin = (req, res) => {
    res.render("login", { style: "login.css" })
}

const viewVerify = (req, res) => {
    res.render("verify", { style: "login.css" })
}

const viewRegister = (req, res) => {
    res.render("register", { style: "register.css" })
}

const viewPasswordRecovery = async (req, res) => {
    res.render("passwordRecovery", { style: "register.css" })
}

const viewResetPassword = async (req, res) => {
    res.render("resetPassword", { style: "register.css" })
}

const viewHome = async (req, res) => {
    const authenticated = req.user != null
    const url = req.protocol + '://' + req.get('host') + req.url
    const products = await productsService.readAll(url, req.query)
    res.render("home", { title: "Vista de productos", products, authenticated, style: "home.css", layout: "main" })
}

const viewProduct = async (req, res) => {
    //Tener un enlace a su vista detallada en /products/:pid
    const authenticated = req.user != null
    const pid = req.params.pid
    const product = await productsService.readById(pid)
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
        if (PERSISTENCE !== "mongo") {
            for (let i = 0; i < cart.length; i++) {
                const productData = await productsService.readById(cart[i].productId)
                cart[i].productId = productData
            }
        }
        if (cart.length > 0) res.render("viewCart", { title: "Carrito de compras", status: true, authenticated, cart, style: "viewCart.css", layout: "main" })
        else res.render("viewCart", { title: "Carrito de compras", status: false, authenticated, style: "viewCart.css", layout: "main" })
    } catch (error) {
        console.log("Error: " + error.message)
        res.render("viewCart", { title: "Carrito de compras", status: false, authenticated, style: "viewCart.css", layout: "main" })
    }
}

export { viewLogin, viewRegister, viewHome, viewProduct, viewCart, isAuthenticated, viewVerify, viewPasswordRecovery, viewResetPassword }