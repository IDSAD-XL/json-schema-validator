const expressJwt = require('express-jwt')
const userService = require("../users/users.service");

function jwt() {
  const secret = process.env.JWT_SECRET

  return expressJwt.expressjwt({ secret, algorithms: ["HS256"], isRevoked }).unless({
    path: [
      "/api/user/login",
      "/api/user/register",
    ]
  })
}

async function isRevoked(req, payload) {
  try {
    const user = await userService.getById(payload.payload.sub)

    return !user;
  } catch (err) {
    console.log(err)
    return true
  }
}

module.exports = jwt