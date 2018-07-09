const { GraphQLClient } = require('graphql-request')
const config = require('../config')
const { token } = config.github
const graphqlClient = new GraphQLClient('https://api.github.com/graphql', {
  headers: { Authorization: `bearer ${token}`, }
})
module.exports = { graphqlClient }
