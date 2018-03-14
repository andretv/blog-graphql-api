const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} = require('graphql')

const PostType = require('./post.schema').type

const postController = require('./post.controller')
const userController = require('./../user/user.controller')

const addPost = {
  type: PostType,
  description: 'Add a post to the system',
  args: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
    authorId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (root, { title, content, authorId }) => {
    const user = await userController.getById(authorId)
    const post = await postController.create({
      title,
      content,
      author: authorId,
    })
    user.posts.push(post.toObject()._id)
    await user.save()
    return post
  },
}

const editPost = {
  type: PostType,
  description: 'Update a post of the system',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    }
  },
  resolve: (root, { id, ...rest }) => postController.update(id, rest),
}

const likePost = {
  type: PostType,
  description: 'Adds a like to a post of the system',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (root, { id, userId }) => {
    const [user, post] = await Promise.all([
      userController.getById(userId),
      postController.getById(id),
    ])
    if (!(user.likes.indexOf(id) === -1)) { return post }
    user.likes.push(id)
    post.likes++
    await Promise.all([
      user.save(),
      post.save(),
    ])
    return post
  },
}

const deletePost = {
  type: PostType,
  description: 'Delete a post of the system',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (root, { id }) => {
    const post = await postController.getById(id)
    await postController.delete(id)
    return post
  },
}

module.exports = {
  addPost,
  editPost,
  likePost,
  deletePost,
}