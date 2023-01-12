const db = require('../_helpers/db')
const errorTypes = require("../_helpers/errorTypes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = db.User

async function create(payload) {
  if (await User.findOne({ email: payload.email })) {
    return { error: errorTypes.EMAIL_IS_TAKEN }
  }

  const user = new User(payload)

  if (payload.password) {
    user.hash = bcrypt.hashSync(payload.password, 10)
  }

  await user.save()

  return await authenticate(payload)
}

async function authenticate({ email, username, password }) {
  const user = await User.findOne({ email })

  if (user && bcrypt.compareSync(password, user.hash)) {
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    })

    return {
      ...user.toJSON(),
      token
    }
  }

  return {
    error: errorTypes.AUTH_ERROR
  }
}

async function saveSchemes(userId, schemes) {
  const user = User.findById(userId)

  if (!user) return { error: "User not found" }

  user.schemes = schemes
}

module.exports = {
  create,
  authenticate
}