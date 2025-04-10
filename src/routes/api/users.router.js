import CustomRouter from "../custom.router.js"
import { usersManager } from "../../data/UsersManager.js"
import passportCallback from "../../middlewares/passportCallback.mid.js"

const createOne = async (req, res) => {
  const data = req.body
  const response = await usersManager.createOne(data)
  res.status(201).json({
    response,
    method: req.method,
    url: req.originalUrl,
  })
}
const readAll = async (req, res) => {
  const filter = req.query
  const response = await usersManager.readAll(filter)
  if (response.length === 0) {
    const error = new Error("Not found")
    error.statusCode = 404
    throw error
  }
  res.status(200).json({
    response,
    method: req.method,
    url: req.originalUrl,
  })
}
const readById = async (req, res) => {
  const { uid } = req.params
  const response = await usersManager.readById(uid)
  if (!response) {
    const error = new Error("Not found")
    error.statusCode = 404
    throw error
  }
  res.status(200).json({
    response,
    method: req.method,
    url: req.originalUrl,
  })
}
const updateById = async (req, res) => {
  const { uid } = req.params
  const data = req.body
  const response = await usersManager.readById(uid)
  if (!response) {
    const error = new Error("Not found")
    error.statusCode = 404
    throw error
  }
  await usersManager.updateById(uid, data)
  res.status(200).json({
    response,
    method: req.method,
    url: req.originalUrl,
  })
}
const destroyById = async (req, res) => {
  const { uid } = req.params
  const response = await usersManager.readById(uid)
  if (!response) {
    const error = new Error("Not found")
    error.statusCode = 404
    throw error
  }
  await usersManager.destroyById(uid)
  res.status(200).json({
    response,
    method: req.method,
    url: req.originalUrl,
  })
}

class UsersRouter extends CustomRouter {
  constructor() {
    super()
    this.init()
  }

  init = () => {
    this.validateId("uid")
    this.create("/", createOne)
    this.read("/", passportCallback("admin"), readAll)
    this.read("/:uid", readById)
    this.update("/:uid", updateById)
    this.destroy("/:uid", passportCallback("admin"), destroyById)
  }
}

const usersRouter = new UsersRouter()

export default usersRouter.getRouter()