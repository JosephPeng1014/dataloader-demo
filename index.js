const { ApolloServer, gql } = require('apollo-server')
const userModel = require('./userModel')

const typeDefs = gql`
  type Query{
    hello: String
    allUsers: [User]
    userById(id: String): User
  }

  type User{
    id: String
    name: String
    following:[String]
    followingUsers: [User]
  }
`

const resolvers = {
  User: {
    followingUsers: (parent, args, { userModel, dataloaders }) => {
      return userModel.getUsersByIds(parent.following)
    }
  },
  Query: {
    hello: () => {
      return 'Hello World'
    },
    allUsers: (root, args, { userModel }) => {
      return userModel.getAllUsers()
    },
    userById: (root, args, { userModel }) => {
      return userModel.getUserbyId(args.id)
    }
  }
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
  context: async ({ req }) => {
    return {
      userModel
    }
  }
})

apolloServer.listen(3000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
