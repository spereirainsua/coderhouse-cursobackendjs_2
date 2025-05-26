import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
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
    state: { type: String, default: "new", enum: ["new", "reserved", "paid", "delivered"], index: true }
},
{ timestamps: true })

// cartSchema.pre("find", function (next) {
//     this.populate("user_id")
//     next()
// })
cartSchema.pre("find", function (next) {
    this.populate("products.productId")
    next()
})

const Cart = mongoose.model("Cart", cartSchema)

export default Cart