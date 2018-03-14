const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
} = require('graphql')

const userController = require('./user.controller')
const postController = require('./../post/post.controller')

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'This represents an user of the system',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: user => user._id,
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: user => user.username,
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: user => user.email,
    },
    posts: {
      type: new GraphQLList(require('./../post/post.schema').type),
      resolve: user => postController.getMany(user.posts),
    },
    likes: {
      type: new GraphQLList(require('./../post/post.schema').type),
      resolve: user => postController.getMany(user.likes),
    },
    createdAt: {
      type: GraphQLString,
      resolve: user => user.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: user => user.updatedAt,
    },
  }),
})

module.exports = {
  type: UserType,
  query: {
    user: {
      type: UserType,
      args: {
        id: {
          name: 'id',
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (root, { id }) => userController.getById(id),
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: () => userController.getAll(),
    },
  },
}