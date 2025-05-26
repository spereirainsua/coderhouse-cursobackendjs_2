import CustomRouter from "../custom.router.js"
import { createOne, readAll, readById, updateById, destroyById } from "../../controllers/users.controller.js"

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