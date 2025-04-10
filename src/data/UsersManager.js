import User from "./models/user.model.js"

class UsersManager {
  createOne = async (data) => await User.create(data)
  readAll = async (filter) => await User.find(filter).lean()
  readBy = async (data) => await User.findOne(data).lean()
  readById = async (id) => await User.findOne({ _id: id }).lean()
  updateById = async (id, data) => await User.findOneAndUpdate({ _id: id }, data, { new: true })
  destroyById = async (id) => await User.findOneAndDelete({ _id: id })
}

export default UsersManager

const usersManager = new UsersManager()

export { usersManager }