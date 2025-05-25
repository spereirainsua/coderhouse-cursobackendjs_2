import FileManager from "./Manager.fs.js"

function setNewPage(url, newPage) {
    const urlParams = new URLSearchParams(url)

    urlParams.set('page', newPage)

    return urlParams.toString()
}

class ProductManager extends FileManager {
    constructor() {
        super("./src/dao/fs/data/products.json")
    }

    addProduct = async (data) => {
        return await this.createOne(data)
    }

    getProducts = async (url, query) => {
        const filter = {
            ...(query.category && { category: query.category }),
        }

        const products = await this.readAll(filter)

        const params = {
            // select: 'title price stock photo',
            limit: query.limit || 10,
            page: query.page || 1,
            sort: query.sort === "asc" ? "+" : query.sort === "desc" ? "-" : {}
        }
        const totalPag = Math.ceil(products.length / params.limit) || 1
        const hasPrevPage = params.page > 1
        const hasNextPage = params.page < totalPag
        const formatedResponse = {
            payload: products,
            totalPages: 1,
            prevPage: hasPrevPage ? params.page - 1 : params.page,
            nextPage: hasNextPage ? params.page + 1 : params.page,
            page: params.page,
            hasPrevPage,
            hasNextPage,
            prevLink: hasPrevPage ? url.split('?')[0] + '?' + setNewPage(url.split('?')[1], params.page - 1) : null,
            nextLink: hasNextPage ? url.split('?')[0] + '?' + setNewPage(url.split('?')[1], params.page + 1) : null
        }
        return formatedResponse
    }


    getProductById = async (pid) => {
        return await this.readById(pid)
    }

    // updateProduct = async (pid, data) => {
    //     // return await Product.findByIdAndUpdate(
    //     //     pid,
    //     //     data,
    //     //     { new: true }
    //     // )
    // }

    // deleteProduct = async (pid) => {
    //     return await Product.findByIdAndDelete(pid)
    // }

}

export default ProductManager

export const productsManager = new ProductManager()