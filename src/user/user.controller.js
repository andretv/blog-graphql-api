const bcrypt = require('bcryptjs')
const model = require('./user.model').model

module.exports = {
  getAll: () => model.find(),
  getById: _id => model.findById(_id),
  create: async data => {
    const { password } = data
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)
    return model.create({ ...data, password: passwordHash })
  },
  update: (_id, data) => model.findByIdAndUpdate(_id, data, { new: true }),
  delete: _id => model.deleteOne({ _id }),
}