import Product from './models/product.model.js'

function setNewPage(url, newPage) {
    const urlParams = new URLSearchParams(url)

    urlParams.set('page', newPage)

    return urlParams.toString()
}

class ProductsManager {
    addProduct = async (title, price, stock, category, photo) => {
        const productData = {
            title,
            price,
            stock,
            category,
            photo
        }
        return await Product.create(productData)
    }

    getProducts = async (url, limit, page, sort, query) => {
        const params = {
            select: 'title price stock photo',
            limit: limit || 10,
            page: page || 1
        }

        if (sort) {
            sort === "asc" ? params.sort = { price: 1 } : sort === "desc" ? params.sort = { price: -1 } : {}
        }

        // Example query -> ?query=code_pci111&query=category_memorias
        const queryFilter = {}
        if (query) {
            if (Array.isArray(query)) {
                query.forEach(param => {
                    const [key, value] = param.split('_')
                    if (key && value !== undefined) {
                        queryFilter[key] = value === "true" ? true : value === "false" ? false : value
                    }
                })
            } else {
                const [key, value] = query.split('_')
                if (key && value !== undefined) {
                    queryFilter[key] = value === "true" ? true : value === "false" ? false : value
                }
            }
        }
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

const productsManager = new ProductsManager()

export { productsManager }