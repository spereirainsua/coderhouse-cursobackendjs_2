import Cart from './models/cart.model.js'

class CartManager {
    createNewCart = async () => {
        try {
            const cart = new Cart()
            const result = await cart.save()
            return { status: "success", payload: result }
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
            const response = await Cart.find({ _id: cid }).lean()
            return { status: "success", payload: response }
        } catch (error) {
            return { status: "error", message: error.message }
        }
    }

    updateProductsInCart = async (cid, pid) => {
        try {
            const cart = await Cart.findById(cid)
            const product = cart.products.find(item => item.productId == pid)
            const productIndex = cart.products.findIndex(item => item.productId == pid)
            if (cart) {
                if (product) {
                    cart.products[productIndex].quantity += 1
                    const response = await cart.save()
                    return { status: "success", payload: response }
                } else {
                    const response = await Cart.findByIdAndUpdate(
                        cid,
                        { $push: { products: { productId: pid, quantity: 1 } } },
                        { new: true }
                    )
                    return { status: "success", payload: response }
                }
            } else return { status: "error", message: "No se encontro el carrito especificado." }
        } catch (error) {
            return { status: "error", message: "Error al agregar un producto " + error.message }
        }
    }

    deleteProductsInCart = async (cid, pid) => {
        try {
            const cart = await Cart.findById(cid)
            const product = cart.products.find(item => item.productId == pid)
            const productIndex = cart.products.findIndex(item => item.productId == pid)
            if (cart) {
                if (product) {
                    const response = await Cart.findByIdAndUpdate(
                        cid,
                        { $pull: { products: { productId: pid } } },
                        { new: true }
                    )

                    return { status: "success", payload: response }
                } else {
                    return { status: "error", message: "No se encontro este producto en el carrito." }
                }
            } else return { status: "error", message: "No se encontro el carrito especificado." }
        } catch (error) {
            return { status: "error", message: "Error al eliminar el producto " + error.message }
        }
    }

    deleteCart = async (cid) => {
        try {
            const response = await Cart.findByIdAndUpdate(
                cid,
                { $set: { products: [] } },
                { new: true }
            )
            return { status: "success", payload: response }
        } catch (error) {
            return { status: "error", message: "No se pudo vaciar el carrito " + error.message }
        }
    }
}

export default CartManager