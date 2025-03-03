import Product from './models/product.model.js'

const validateFields = (fields) => {
    for (let f of fields) {
        if (!f) return false
        if (f.toString().trim() === '') return false
    }
    return true
}

class ProductManager {
    constructor() {
        //Por si se necesita inicializar con algun valor especifico la instancia
        // if (ProductManager.instance) {
        //     return ProductManager.instance
        // }
        // ProductManager.instance = this
    }

    addProduct = async (title, description, code, price, stock, category, thumbnail) => {
        try {
            if (validateFields([title, description, code, price, stock, category, thumbnail])) {
                const product = new Product({
                    title: title,
                    description: description,
                    code: code,
                    price: price,
                    stock: stock,
                    category: category,
                    thumbnail: thumbnail
                })
                await product.save()
                return { status: 201,  message: { status: "success", message: "Producto ingresado correctamente!"} }
            } else 
                return { status: 400,  message: { status: "error", message: "Error al procesar los datos de la solicitud." } }
        } catch (error) {
            if (error.code == 11000)
                return { status: 500, message: { status: "error", message: "Código de producto duplicado."} }
            else 
                return { status: 500, message: { status: "error", message: "Error al intentar realizar la solicitud."} }
        }
    }

    getProducts = async () => {
        try {
            const products = await Product.find()
            return { status: "success", payload: products }
        } catch (error) {
            return { status: "error", message: error.message }
        }
    }


    getProductById = async (pid) => {
        try {
            const response = await Product.findById(pid)
            return response
        } catch (error) {
            return { status: "error", message: error.message }
        }
    }

    updateProduct = async (pid, title, description, price, thumbnail, code, stock, status) => {
        try {
            const updatedData = {
                ...(title ? { title: title } : {}),
                ...(description ? { description: description } : {}),
                ...(price ? { price: price } : {}),
                ...(thumbnail ? { thumbnail: thumbnail } : {}),
                ...(code ? { code: code } : {}),
                ...(stock ? { stock: stock } : {}),
                ...(status ? { status: status } : {})
            }
            const response = await Product.findByIdAndUpdate(
                pid,
                updatedData,
                { new: true }
            )
            return response
        } catch (error) {
            return { status: "error", message: "Error al actualizar el producto." }
        }
    }

    deleteProduct = async (pid) => {
        try {
            const result = await Product.findByIdAndDelete(pid)
            return result
        } catch (error) {
            return null
        }
    }
}

export default ProductManager