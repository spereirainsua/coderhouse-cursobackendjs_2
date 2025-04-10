import jwt from "jsonwebtoken"

const createToken = (data) => {
  try {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
  } catch (error) {
    error.statusCode = 401
    throw error
  }
}

const decodeToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
};

export { createToken, decodeToken }
