import Cart from './models/cart.model.js'

class CartsManager {
    createNewCart = async (data) => {
        return await Cart.create(data)
    }

    getCartById = async (cid) => {
        return await Cart.find({ _id: cid }).lean()
    }

    getCartBy = async (filter) => {
        return await Cart.findOne(filter).lean()
    }

    updateProductsInCart = async (cid, pid) => {
        const product = await Cart.findOne({
            _id: cid,
            "products.productId": pid
        })
        if (product) {
            return await Cart.findByIdAndUpdate(
                cid,
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
                cid,
                { $push: { products: { productId: pid, quantity: 1 } } },
                { new: true }
            )
        }
    }

    deleteProductsInCart = async (cid, pid) => {
        return await Cart.findByIdAndUpdate(
            cid,
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