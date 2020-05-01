const {Schema, model} = require('mongoose')

const userModel = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
)

module.exports = model('User', userModel)
