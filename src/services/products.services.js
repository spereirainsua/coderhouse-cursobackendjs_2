import { productsManager } from "../data/ProductsManager.js"

class ProductService {
    createOne = async (data) => await productsManager.addProduct(data)
    readAll = async (url, limit, page, sort, query) => await productsManager.getProducts(url, limit, page, sort, query)
    readById = async (pid) => await productsManager.getProductById(pid)
    updateById = async (pid, data) => await productsManager.updateProduct(pid, data)
    destroyById = async (pid) => await productsManager.deleteProduct(pid)
}

const productsService = new ProductService()

export default productsService