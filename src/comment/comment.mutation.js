const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} = require('graphql')

const CommentType = require('./comment.schema').type

const commentController = require('./comment.controller')
const postController = require('./../post/post.controller')

const addComment = {
  type: CommentType,
  description: 'Add a comment to a post',
  args: {
    authorId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    postId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (root, { authorId, postId, content }) => {
    const post = await postController.getById(postId)
    post.comments.push({
      content,
      author: authorId,
    })
    const newPost = await post.save()
    const postComments = newPost.toObject().comments
    return postComments[postComments.length - 1]
  },
}

const editComment = {
  type: CommentType,
  description: 'Update a comment of a post',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    postId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve: async (root, { id, postId, content }) => {
    const post = await postController.getById(postId)
    const comment = post.comments.id(id)
    comment.content = content
    await post.save()
    return comment
  },
}

const deleteComment = {
  type: CommentType,
  description: 'Delete a comment of a post',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    postId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (root, { id, postId }) => {
    const post = await postController.getById(postId)
    const comment = post.comments.id(id)
    post.comments.id(id).remove()
    await post.save()
    return comment
  },
}

module.exports = {
  addComment,
  editComment,
  deleteComment,
}