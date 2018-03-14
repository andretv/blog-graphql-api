const {
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql')

////////////
// Querys //
////////////
const UserSchema = require('./user/user.schema').query
const PostSchema = require('./post/post.schema').query
const CommentSchema = require('./comment/comment.schema').query

const RootQuery = new GraphQLObjectType({
  name: 'BlogQuery',
  description: 'Blog Application Schema Root Query',
  fields: () => ({
    ...UserSchema,
    ...PostSchema,
    // ...CommentSchema,
  }),
})
///////////////
// Mutations //
///////////////
const UserMutation = require('./user/user.mutation')
const PostMutation = require('./post/post.mutation')
const CommentMutation = require('./comment/comment.mutation')

const RootMutation = new GraphQLObjectType({
  name: 'BlogMutation',
  description: 'Blog Mutations',
  fields: () => ({
    ...UserMutation,
    ...PostMutation,
    ...CommentMutation,
  }),
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
})