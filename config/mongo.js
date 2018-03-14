const mongoose = require('mongoose')

const mongoClient = () =>
  mongoose
    .connect(
      'mongodb://mongo/blog',
      err => {
        err
          ? console.error(err)
          : console.log('Mongo connected')
      }
    )

module.exports = mongoClient