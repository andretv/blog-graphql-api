const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
} = require('graphql')

const commentController = require('./comment.controller')
const userController = require('./../user/user.controller')

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'This represents a comment of the system',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: comment => comment._id,
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: comment => comment.content,
    },
    author: {
      type: new GraphQLNonNull(require('./../user/user.schema').type),
      resolve: comment => userController.getById(comment.author),
    },
    createdAt: {
      type: GraphQLString,
      resolve: comment => comment.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: comment => comment.updatedAt,
    },
  }),
})

module.exports = {
  type: CommentType,
  query: {
    comment: {
      type: CommentType,
      args: {
        id: {
          name: 'id',
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (root, { id }) => commentController.getById(id),
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve: () => commentController.getAll(),
    },
  },
}