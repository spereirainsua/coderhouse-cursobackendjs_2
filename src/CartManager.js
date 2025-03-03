import Cart from './models/cart.model.js'

class CartManager {
    constructor() {
        if (CartManager.instance) {
            return CartManager.instance
        }
        CartManager.instance = this
    }

    createNewCart = async () => {
        try {
            const cart = new Cart()
            await cart.save()
            return { status: "success", message: "Carrito creado correctamente!" }
        } catch (error) {
            console.error("Error al crear el carrito: " + error.message)
            return { status: "error", message: "Error al crear el carrito." }
        }
    }

    getCarts = async () => {
        try {
            const products = await Cart.find()
            return { status: "success", payload: products }
        } catch (error) {
            return { status: "error", message: error.message }
        }
    }

    getCartById = async (cid) => {
        try {
            const response = await Cart.findById(cid)
            return { status: "success", payload: response }
        } catch (error) {
            return { status: "error", message: error.message }
        }
    }

    addProductToCart = async (cid, pid) => {
        try {
            const cart = await Cart.findById(cid)
            const product = cart.products.find(item => item.productId == pid)
            const productIndex = cart.products.findIndex(item => item.productId == pid)
            if (cart) {
                if (!product) {
                    const response = await Cart.findByIdAndUpdate(
                        cid,
                        { $push: { products: { productId: pid, quantity: 1 } } },
                        { new: true }
                    )
                    return { status: "success", payload: response }
                } else {
                    cart.products[productIndex].quantity += 1
                    const response = await cart.save()
                    return { status: "success", payload: response}
                }
            } else return { status: "error", message: "No se encontro el carrito especificado." }
        } catch (error) {
            return { status: "error", message: "Error al agregar un producto " + error.message }
        }
    }
}

export default CartManager