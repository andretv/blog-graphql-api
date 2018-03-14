const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoClient = require('./mongo')
const schema = require('./../src/schema')

const app = express()
mongoClient()

app.use(express.json())

app.use('/', graphqlHTTP(
  request => {
    const requestStartTime = Date.now()
    return {
      schema,
      graphiql: true,
      extensions: () => ({
        runTime: Date.now() - requestStartTime,
      }),
    }
  }
))

module.exports = app