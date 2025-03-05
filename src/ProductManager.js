import Product from './models/product.model.js'

const validateFields = (fields) => {
    for (let f of fields) {
        if (!f) return false
        if (f.toString().trim() === '') return false
    }
    return true
}

function setNewPage(url, newPage) {
    const urlParams = new URLSearchParams(url)

    urlParams.set('page', newPage)

    return urlParams.toString()
}

class ProductManager {
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
                return { status: 201, message: { status: "success", message: "Producto ingresado correctamente!" } }
            } else
                return { status: 400, message: { status: "error", message: "Error al procesar los datos de la solicitud." } }
        } catch (error) {
            if (error.code == 11000)
                return { status: 500, message: { status: "error", message: "Código de producto duplicado." } }
            else
                return { status: 500, message: { status: "error", message: "Error al intentar realizar la solicitud." } }
        }
    }

    getProducts = async (url, limit, page, sort, query) => {
        try {
            const params = {
                select: 'title price stock thumbnail',
                limit: limit || 10,
                page: page || 1
            }

            if (sort) {
                sort === "asc" ? params.sort = { price: 1 } : sort === "desc" ? params.sort = { price: -1 } : {}
            }

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
            const response = await Product.paginate(queryFilter, {...params, lean: true})
            
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
            //Falta realizar proyección para no consultar tantos datos juntos
            return { status: "success", ...formatedResponse }
        } catch (error) {
            return { status: "error", message: error.message }
        }
    }


    getProductById = async (pid) => {
        try {
            const response = await Product.findById(pid).lean()
            return { status: "success", payload: response }
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