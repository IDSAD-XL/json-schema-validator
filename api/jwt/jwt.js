const expressJwt = require('express-jwt')

function jwt() {
  const secret = process.env.JWT_SECRET

  return expressJwt.expressjwt({ secret, algorithms: ["HS256"], isRevoked }).unless({
    path: []
  })
}

async function isRevoked(req, payload, done) {
  try {
    //TODO: find user in user DB with UserService
    const user = {
      id: 1,
      name: 'name'
    }

    if (!user) {
      return done(null, true)
    }

  } catch (err) {
    done(err)
  }
}

module.exports = jwt