import Product from './models/product.model.js'

function setNewPage(url, newPage) {
    const urlParams = new URLSearchParams(url)

    urlParams.set('page', newPage)

    return urlParams.toString()
}

class ProductsManager {
    addProduct = async (data) => {
        return await Product.create(data)
    }

    getProducts = async (url, query) => {

        const params = {
            select: 'title price stock photo',
            limit: query.limit || 10,
            page: query.page || 1,
            sort: query.sort === "asc" ? { price: 1 } : query.sort === "desc" ? { price: -1 } : {}
        }
        const { category } = query
        const queryFilter = category ? { category } : {}

        const response = await Product.paginate(queryFilter, { ...params, lean: true })

        const formatedResponse = {
            payload: response.docs,
            totalPages: response.totalPages,
            prevPage: response.hasPrevPage ? response.page - 1 : response.page,
            nextPage: response.hasNextPage ? response.page + 1 : response.page,
            page: response.page,
            hasPrevPage: response.hasPrevPage,
            hasNextPage: response.hasNextPage,
            prevLink: response.hasPrevPage ? url.split('?')[0] + '?' + setNewPage(url.split('?')[1], response.page - 1) : null,
            nextLink: response.hasNextPage ? url.split('?')[0] + '?' + setNewPage(url.split('?')[1], response.page + 1) : null
        }
        return formatedResponse
    }


    getProductById = async (pid) => {
        return await Product.findById(pid).lean()
    }

    updateProduct = async (pid, data) => {
        return await Product.findByIdAndUpdate(
            pid,
            data,
            { new: true }
        )
    }

    deleteProduct = async (pid) => {
        return await Product.findByIdAndDelete(pid)
    }
}

export default ProductsManager

export const productsManager = new ProductsManager()