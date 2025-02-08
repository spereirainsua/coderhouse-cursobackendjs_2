import fs from "fs"

const validateFields = (fields) => {
    for (let f of fields) {
        if (!f) return false
        if (f.toString().trim() === '') return false
    }
    return true
}

class ProductManager {
    //propiedades y metodos para obtener, crear, editar y eliminar un producto.
    //guardar datos en json
    pid = 1
    products = []
    pathFile = ""

    constructor(pathFile) {
        this.pathFile = pathFile
        //obtener ID del ultimo registro y guardarlo en id
        //cargar productos desde json a array de datos products
        try {
            let data = "[]"
            if (fs.existsSync(pathFile)) {
                data = fs.readFileSync(pathFile, "utf8")
                this.products = JSON.parse(data)
            } else {
                data = fs.writeFileSync(pathFile, "[]", "utf8")
            }
            console.log("Se cargaron los productos correctamente")
            if (this.products.length > 0) {
                for (let prod of this.products) {
                    if (prod.pid > this.pid) this.pid = prod.pid
                }
                this.pid++
            }
        } catch (error) {
            console.log(error)
        }
    }

    addProduct = (title, description, code, price, stock, category, thumbnail) => {
        try {
            let isUniqCode = this.products.find((prod) => prod.code === code) === undefined
            if (!isUniqCode) {
                return 400
            }
            if (validateFields([title, description, code, price, stock, category, thumbnail])) {
                const product = {
                    pid: this.pid++,
                    title: title,
                    description: description,
                    code: code,
                    price: price,
                    status: true,
                    stock: stock,
                    category: category,
                    thumbnail: thumbnail                    
                }
                this.products.push(product)
                fs.writeFileSync(this.pathFile, JSON.stringify(this.products, null, 2), "utf-8")
                return 201
            } else return 400
        } catch (error) {
            console.error(error)
            return 500
        }
    }

    getProducts = () => {
        return this.products
    }

    getProductById = (pid) => {
        let productResult = this.products.filter((prod) => parseInt(prod.pid) === parseInt(pid))
        if (productResult.length > 0) {
            return productResult[0]
        } else {
            console.log("Not found")
            return null
        }
    }

    updateProduct = (pid, title, description, price, thumbnail, code, stock) => {
        try {
            let productIndex = this.products.findIndex((product) => parseInt(product.pid) === parseInt(pid))
            if (productIndex != -1 && title != '' && description != '' && price != undefined && thumbnail != '' && code != '' && stock != undefined) {
                this.products[productIndex] = {
                    pid: pid,
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock
                }
                fs.writeFileSync(this.pathFile, JSON.stringify(this.products, null, 2), "utf-8")
                return { message: "Producto actualizado", index: productIndex }
            } else {
                if (productIndex === -1)
                    return { message: "No se pudo encontrar el producto.", index: productIndex }
                else
                    return { message: "Error al recuperar los nuevos datos del producto.", index: -2 }
            }
        } catch (error) {
            console.error(error)
            return { message: "Error inesperado, no se pudo actualizar el producto", index: -3 }
        }
    }

    deleteProduct = (pid) => {
        try {
            const productindex = this.products.findIndex((product) => parseInt(product.pid) === parseInt(pid))
            if (productindex === -1) return productindex
            this.products.splice(productindex, 1)
            fs.writeFileSync(this.pathFile, JSON.stringify(this.products, null, 2), "utf-8")
            return 1
        } catch (error) {
            console.error(error)
            return null
        }
    }
}

export default ProductManager