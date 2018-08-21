const { query } = require('../graphql')
const {
  graphqlClient,
  deleteProjectCard,
  baseVariables
} = require('../lib/github')

module.exports = async (payload) => {
  const { issue: { number }, label: { name } } = payload
  const variables =  Object.assign({}, baseVariables, {
    number, projectName: name
  })

  const issue = await graphqlClient.request(query.findIssue, variables)
  if (issue.repository.issue.projectCards.edges.length === 0) return

  const card = issue.repository.issue.projectCards.edges[0].node
  if (card.project.name === name) {
    await deleteProjectCard({ card })
  }
}
