import { cartsManager } from "../data/CartsManager.js"

const createOne = async (req, res) => {
    const response = await cartsManager.createNewCart(req?.user?._id)
    if (!response) {
        res.json404("Not created")
    }
    res.json201(response)
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
    const response = await cartsManager.updateProductsInCart(cart[0], pid)
    res.json200(response)
}

const deleteProductById = async (req, res) => {
    const { cid, pid } = req.params
    const cart = await cartsManager.getCartById(cid)
    if (!cart) {
        res.json404()
    }
    const response = await cartsManager.deleteProductsInCart(cart[0], pid)
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
    const user_id = req.user._id
    const response = await cartsManager.getCartByUid(user_id)
    if (!response) {
        res.json404()
    }
    res.json200(response[0])
}

export { createOne, readById, updateProductById, deleteProductById, deleteCart, getCartByUser}