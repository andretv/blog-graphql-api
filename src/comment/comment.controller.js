const model = require('./comment.model').model

module.exports = {
  getAll: () => model.find(),
  getById: _id => model.findById(_id),
  create: data => model.create(data),
  update: (_id, data) => model.findByIdAndUpdate(_id, data, { new: true }),
  delete: _id => model.deleteOne({ _id }),
}