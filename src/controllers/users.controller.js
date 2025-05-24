import { usersManager } from "../data/UsersManager.js"

const createOne = async (req, res) => {
  const data = req.body
  const response = await usersManager.createOne(data)
  res.json201(response)
}
const readAll = async (req, res) => {
  const filter = req.query
  const response = await usersManager.readAll(filter)
  if (response.length === 0) {
    res.json404()
  }
  res.json200(response)
}
const readById = async (req, res) => {
  const { uid } = req.params
  const response = await usersManager.readById(uid)
  if (!response) {
    res.json404()
  }
  res.json200(response)
}
const updateById = async (req, res) => {
  const { uid } = req.params
  const data = req.body
  const response = await usersManager.readById(uid)
  if (!response) {
    res.json404()
  }
  await usersManager.updateById(uid, data)
  res.json200()
}
const destroyById = async (req, res) => {
  const { uid } = req.params
  const response = await usersManager.readById(uid)
  if (!response) {
    res.json404()
  }
  await usersManager.destroyById(uid)
  res.json200()
}

export { createOne, readAll, readById, updateById, destroyById }