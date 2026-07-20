const jwt = require('jsonwebtoken')
const JWT_SECRET = 'your-super-secret-key-that-is-long-and-secure'

module.exports.validateToken = (req, res, next) => {
  let response = {}

  if (!req.headers.authorization) {
    response.status = 401
    response.message = 'Token is missing or invalid'
    return res.status(response.status).send(response)
  }

  const token = req.headers.authorization.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    response.status = 401
    response.message = 'Token is invalid'
    return res.status(response.status).send(response)
  }
}