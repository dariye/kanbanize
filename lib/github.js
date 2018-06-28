const { GraphQLClient } = require('graphql-request')

const config = require('../config')
const { token, graphql } = config.github

const graphqlClient = new GraphQLClient(graphql, {
  headers: { Authorization: `bearer ${token}`, }
})
module.exports = { graphqlClient }
