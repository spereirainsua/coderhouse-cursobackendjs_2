import mongoose from "mongoose"
import paginate from "mongoose-paginate-v2"

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, default: 1 },
    stock: { type: Number, default: 1 },
    category: { type: String, default: "no_category", enum: ["no_category", "motherboards", "cpu", "gpu", "ram_memory", "storage", "peripherals"]},
    photo: { type: String, default: "/img/product_default.png" }
})

productSchema.plugin(paginate)

const Product = mongoose.model("Product", productSchema)

export default Product