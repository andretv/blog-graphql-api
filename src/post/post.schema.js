const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
} = require('graphql')

const userController = require('./../user/user.controller')
const postController = require('./post.controller')

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'This represents a post of the system',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: post => post._id,
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: post => post.title,
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: post => post.content,
    },
    author: {
      type: new GraphQLNonNull(require('./../user/user.schema').type),
      resolve: post => userController.getById(post.author),
    },
    likes: {
      type: GraphQLInt,
      resolve: post => post.likes,
    },
    comments: {
      type: new GraphQLList(require('./../comment/comment.schema').type),
      resolve: post => post.comments,
    },
    createdAt: {
      type: GraphQLString,
      resolve: post => post.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: post => post.updatedAt,
    },
  }),
})

module.exports = {
  type: PostType,
  query: {
    post: {
      type: PostType,
      args: {
        id: {
          name: 'id',
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (root, { id }) => postController.getById(id),
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: () => postController.getAll(),
    },
  },
}