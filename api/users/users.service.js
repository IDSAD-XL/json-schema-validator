const db = require('../_helpers/db')

const User = db.User

async function create(payload) {
  if (await User.findOne({ email: payload.email })) {
    return {  }
  }
}