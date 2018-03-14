const model = require('./post.model').model

module.exports = {
  getAll: () => model.find(),
  getMany: data => model.find({ _id: { $in: data } }),
  getById: _id => model.findById(_id),
  create: data => model.create(data),
  update: (_id, data) => model.findByIdAndUpdate(_id, data, { new: true }),
  delete: _id => model.deleteOne({ _id }),
  deleteMany: data => model.deleteMany({ _id: { $in: data } }),
}