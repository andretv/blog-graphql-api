const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} = require('graphql')

const UserType = require('./user.schema').type

const userController = require('./user.controller')
const postController = require('./../post/post.controller')

const addUser = {
  type: UserType,
  description: 'Add an user to the system',
  args: {
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (root, { username, password, email }) =>
    userController.create({
      username,
      password,
      email,
    }),
}

const deleteUser = {
  type: UserType,
  description: 'Delete an user of the system',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (root, { id }) => {
    const user = await userController.getById(id)
    await postController.deleteMany(user.posts)
    await userController.delete(id)
    return user
  },
}

module.exports = {
  addUser,
  deleteUser,
}