import mongoose from "mongoose"
import paginate from "mongoose-paginate-v2"

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: {
        type: String,
        unique: true
    },
    price: Number,
    status: {
        type: Boolean,
        default: true
    },
    stock: Number,
    category: String,
    thumbnail: String
})

productSchema.plugin(paginate)

const Product = mongoose.model("Product", productSchema)

export default Product