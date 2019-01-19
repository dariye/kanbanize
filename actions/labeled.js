const { query } = require('../graphql')
const {
  graphqlClient,
  addProjectCard,
  moveProjectCard,
  baseVariables
} = require('../lib/github')

module.exports = async (payload) => {
  try {
    const { issue: { number }, label: { name } } = payload
    const variables =  Object.assign({}, baseVariables, {
      number, projectName: name
    })

    const [issue, project] = await Promise.all([
        graphqlClient.request(query.findIssue, variables),
        graphqlClient.request(query.findProject, variables)
    ])

    const label = issue.repository.issue.labels.edges
      .find(label => label.node.name === name)

    const { description } = label.node

    switch(description) {
      case 'project':
        await addProjectCard({ label, project, issue, variables })
        break
      case 'status':
        await moveProjectCard({ label, issue, variables })
        break
      default:
    }
  } catch (err) {
    console.log(err)
    return new Error(err)
  }
}
