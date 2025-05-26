import dao from "../dao/index.factory.js"
import CartsDTO from "../dto/carts.dto.js"

const { cartsManager } = dao

const createOne = async (req, res) => {
    const user_id = req.user._id
    const cart = await cartsManager.getCartBy({ user_id, state: "new" })
    if (!cart) {
        const data = new CartsDTO({ user_id })
        console.log(data)
        const response = await cartsManager.createNewCart(data)
        if (!response) {
            res.json404("Not created")
        }
        res.json201(response)
    } else res.json200(cart)
}

const readById = async (req, res) => {
    const { cid } = req.params
    const response = await cartsManager.getCartById(cid)
    if (!response) {
        res.json404()
    }
    res.json200(response)
}

const updateProductById = async (req, res) => {
    const { cid, pid } = req.params
    const cart = await cartsManager.getCartById(cid)
    if (!cart) {
        res.json404()
    }
    const response = await cartsManager.updateProductsInCart(cid, pid)
    res.json200(response)
}

const deleteProductById = async (req, res) => {
    const { cid, pid } = req.params
    const cart = await cartsManager.getCartById(cid)
    if (!cart) {
        res.json404()
    }
    const response = await cartsManager.deleteProductsInCart(cid, pid)
    res.json200(response)
}

const deleteCart = async (req, res) => {
    const { cid } = req.params
    const cart = await cartsManager.getCartById(cid)
    if (!cart) {
        res.json404()
    }
    await cartsManager.deleteCart(cid)
    res.json200()
}

const getCartByUser = async (req, res) => {
    const user_id = req?.user?._id
    const response = await cartsManager.getCartBy({ user_id, state: "new" })
    if (!response) {
        res.json404()
    }
    res.json200(response[0])
}

export { createOne, readById, updateProductById, deleteProductById, deleteCart, getCartByUser }