import Cart from './models/cart.model.js'

class CartsManager {
    createNewCart = async () => {
        return await Cart.create()
    }

    getCartById = async (cid) => {
        return await Cart.find({ _id: cid }).lean()
    }

    updateProductsInCart = async (cart, pid) => {
        const product = cart.products.find(item => item.productId._id == pid)
        if (product) {
            return await Cart.findByIdAndUpdate(
                cart._id,
                {
                    $inc: { "products.$[elem].quantity": 1 }
                },
                {
                    arrayFilters: [{ "elem.productId": pid }],
                    new: true
                }
            )
        } else {
            return await Cart.findByIdAndUpdate(
                cart._id,
                { $push: { products: { productId: pid, quantity: 1 } } },
                { new: true }
            )
        }
    }

    deleteProductsInCart = async (cart, pid) => {
        return await Cart.findByIdAndUpdate(
            cart._id,
            { $pull: { products: { productId: pid } } },
            { new: true }
        )
    }

    deleteCart = async (cid) => {
        return await Cart.findByIdAndUpdate(
            cid,
            { $set: { products: [] } },
            { new: true }
        )
    }
}

export default CartsManager

const cartsManager = new CartsManager()

export { cartsManager }