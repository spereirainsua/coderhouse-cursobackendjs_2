import {productsRepository} from "../repositories/products.repository.js"

class ProductService {
    createOne = async (data) => await productsRepository.createOne(data)
    readAll = async (url, query) => await productsRepository.readAll(url, query)
    readById = async (pid) => await productsRepository.readById(pid)
    updateById = async (pid, data) => await productsRepository.updateById(pid, data)
    destroyById = async (pid) => await productsRepository.destroyById(pid)
}

export default ProductService

export const productsService = new ProductService()