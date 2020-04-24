const {ApolloError} = require('apollo-server')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../../models/user')

module.exports.mutations = {
  signUp: async function (_, args) {
    const {registry} = args
    const hash = await bcrypt.hash(registry.password, 10)
    registry.password = hash
    const user = new UserModel(registry)
    return await user.save()
  },

  login: async function (_, {email, password}) {
    try {
      const user = await UserModel.findOne({email})
      const result = await bcrypt.compare(password, user.password)
      if (result) {
        const token = jwt.sign({email: user.email}, process.env.JWT_SECRET_KEY)
        return {token}
      }
    } catch (err) {
      throw new ApolloError(`Coudn't verify credentials.`)
    }
  },
}
