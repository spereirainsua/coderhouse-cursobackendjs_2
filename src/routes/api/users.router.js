import CustomRouter from "../custom.router.js"
import { usersManager } from "../../data/UsersManager.js"
import passportCallback from "../../middlewares/passportCallback.mid.js"

const createOne = async (req, res) => {
  const data = req.body
  const response = await usersManager.createOne(data)
  res.json201(response)
  
  // .status(201).json({
  //   response,
  //   method: req.method,
  //   url: req.originalUrl,
  // })
}
const readAll = async (req, res) => {
  const filter = req.query
  const response = await usersManager.readAll(filter)
  if (response.length === 0) {
    res.json404()
  }
  res.json200(response)
  
  // .status(200).json({
  //   response,
  //   method: req.method,
  //   url: req.originalUrl,
  // })
}
const readById = async (req, res) => {
  const { uid } = req.params
  const response = await usersManager.readById(uid)
  if (!response) {
    res.json404()
  }
  res.json200(response)
  
  // .status(200).json({
  //   response,
  //   method: req.method,
  //   url: req.originalUrl,
  // })
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
  
  // .status(200).json({
  //   response,
  //   method: req.method,
  //   url: req.originalUrl,
  // })
}
const destroyById = async (req, res) => {
  const { uid } = req.params
  const response = await usersManager.readById(uid)
  if (!response) {
    res.json404()
  }
  await usersManager.destroyById(uid)
  res.json200()
  
  // .status(200).json({
  //   response,
  //   method: req.method,
  //   url: req.originalUrl,
  // })
}

class UsersRouter extends CustomRouter {
  constructor() {
    super()
    this.init()
  }

  init = () => {
    this.validateId("uid")
    this.create("/", ["PUBLIC"], createOne)
    this.read("/", ["ADMIN"], readAll)
    this.read("/:uid", ["USER", "ADMIN"], readById)
    this.update("/:uid", ["USER", "ADMIN"], updateById)
    this.destroy("/:uid", ["ADMIN"], destroyById)
  }
}

const usersRouter = new UsersRouter()

export default usersRouter.getRouter()