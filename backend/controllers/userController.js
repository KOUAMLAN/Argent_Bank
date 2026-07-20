const jwt = require('jsonwebtoken')
const JWT_SECRET = 'your-super-secret-key-that-is-long-and-secure'

// MOCK DATABASE
let users = {
    "tony@stark.com": {
        password: "password123",
        profile: {
            id: "1",
            email: "tony@stark.com",
            firstName: "Tony",
            lastName: "Stark",
            userName: "Iron",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
        }
    },
    "steve@rogers.com": {
        password: "password456",
        profile: {
            id: "2",
            email: "steve@rogers.com",
            firstName: "Steve",
            lastName: "Rogers",
            userName: "Cap",
            createdAt: "2024-01-02T00:00:00Z",
            updatedAt: "2024-01-02T00:00:00Z",
        }
    }
}

module.exports.createUser = (req, res) => {
  // Simulation de création
  const response = {
    status: 200,
    message: 'User successfully created',
    body: {}
  }
  return res.status(200).send(response)
}

module.exports.loginUser = (req, res) => {
  const { email, password } = req.body
  const user = users[email]

  if (user && user.password === password) {
    const token = jwt.sign({ email: email }, JWT_SECRET, { expiresIn: '1h' })
    const response = {
        status: 200,
        message: 'User successfully logged in',
        body: { token }
    }
    return res.status(200).send(response)
  }

  return res.status(400).send({ status: 400, message: 'Invalid credentials' })
}

module.exports.getUserProfile = (req, res) => {
  const email = req.user.email
  const user = users[email]

  if (user) {
    const response = {
        status: 200,
        message: 'Successfully got user profile data',
        body: user.profile
    }
    return res.status(200).send(response)
  }
  return res.status(404).send({ status: 404, message: 'User not found' })
}

module.exports.updateUserProfile = (req, res) => {
  const email = req.user.email
  const user = users[email]

  if (user) {
    user.profile.userName = req.body.userName
    const response = {
        status: 200,
        message: 'User profile successfully updated',
        body: user.profile
    }
    return res.status(200).send(response)
  }
  return res.status(404).send({ status: 404, message: 'User not found' })
}