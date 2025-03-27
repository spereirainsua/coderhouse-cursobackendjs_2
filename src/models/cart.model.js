import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product"
                },
                quantity: Number
            }
        ],
        default: []
    }
})

cartSchema.pre("find", function(next) {
    this.populate("products.productId")
    next()
})

const Cart = mongoose.model("Cart", cartSchema)

export default Cart