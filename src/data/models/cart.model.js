import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
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
    },
    state: { type: String, default: "empty", enum: ["reserved", "paid", "delivered"], index: true }
})

cartSchema.pre("find", function (next) {
    this.populate("users.user_id")
    next()
})
cartSchema.pre("find", function (next) {
    this.populate("products.productId")
    next()
})

const Cart = mongoose.model("Cart", cartSchema)

export default Cart