import dao from "../dao/index.factory.js"
import ProductDTO from "../dto/products.dto.js"

const { productsManager } = dao

class ProductRepository {
    createOne = async (data) => await productsManager.addProduct(new ProductDTO(data))
    readAll = async (url, query) => await productsManager.getProducts(url, query)
    readById = async (pid) => await productsManager.getProductById(pid)
    updateById = async (pid, data) => await productsManager.updateProduct(pid, data)
    destroyById = async (pid) => await productsManager.deleteProduct(pid)
}



export default ProductRepository

export const productsRepository = new ProductRepository()