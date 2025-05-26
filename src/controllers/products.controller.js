import {productsService} from "../services/products.services.js"

const createOne = async (req, res) => {
    const data = req.body
    if (!data.title || data.title.toString().trim() === '') {
        res.json400()
    }
    const response = await productsService.createOne(data)
    res.json201(response)
}

const readAll = async (req, res) => {
    const url = req.protocol + '://' + req.get('host') + req.url
    const response = await productsService.readAll(url, req.query)
    if (response.length === 0) {
        res.json404()
    }
    res.json200(response)
}

const readById = async (req, res) => {
    const { pid } = req.params
    const response = await productsService.readById(pid)
    if (!response) {
        res.json404()
    }
    res.json200(response)
}

const updateById = async (req, res) => {
    const { pid } = req.params
    const data = req.body
    const product = await productsService.readById(pid)
    if (!product) {
        res.json404()
    }
    const response = await productsService.updateById(pid, data)
    res.json200(response)
}

const destroyById = async (req, res) => {
    const { pid } = req.params
    const response = await productsService.readById(pid)
    if (!response) {
        res.json404()
    }
    await productsService.destroyById(pid)
    res.json200()
}

export { createOne, readAll, readById, updateById, destroyById }