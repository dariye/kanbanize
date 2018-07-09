const async = require('async')
const config = require('../config')
const { graphqlClient } = require('../lib/github')
const { query, mutation } = require('../graphql')

const { owner, repo } = config.github
const baseVariables = { owner, name: repo }

const addToProject = async (project, issue, variables) => {
  if (!project || project.repository.projects.edges.length === 0) return
  if (!issue) return
  if (!variables) return

  const { repository: { issue: { id: contentId } } } = issue
  const projectColumnId = project.repository.projects.edges[0].node.columns.edges[0].node.id || null
  if (contentId && projectColumnId) {
    const projectCardMutationVariables = Object.assign({}, variables, {
      "issue": { contentId, projectColumnId }
    })
    await graphqlClient.request(mutation.AddProjectCard, projectCardMutationVariables)
  }
}

const moveProjectCard = async (destinationColumnName, issue, variables) => {
  if (!destinationColumnName) return
  if (!issue) return
  if (!variables) return
  const { repository: { issue: { projectCards } } }  = issue
  async.each(projectCards.edges, async ({ node: {
    id: cardId,
    project: { name: projectName },
    column: { id: currentColumnId, name: currentColumnName } } }) => {
    const project = await graphqlClient.request(query.FindProjectColumns,
      Object.assign({}, variables, { projectName })
    )
    const { repository: { projects: { edges } } } = project
    async.each(edges, async ({ node: { columns: { edges } } }) => {
      async.each(edges, async ({ node: { id: columnId, name: columnName } }) => {
        if (columnId === currentColumnId) return
        if (columnName.toLowerCase() === currentColumnName.toLowerCase()) return
        if (columnName.toLowerCase() !== destinationColumnName.toLowerCase()) return
        const projectCardMutationVariables = Object.assign({}, variables, {
          "card": { cardId, columnId }
        })
        await graphqlClient.request(mutation.MoveProjectCard, projectCardMutationVariables)
      })
    })
  })
}

async function labeled (payload) {
  const { issue: { number, state, labels }, label: { name } } = payload
  const variables =  Object.assign({}, baseVariables, {
    number, projectName: name
  })
  const [issue, project] = await Promise.all([
    graphqlClient.request(query.FindIssue, variables),
    graphqlClient.request(query.FindProject, variables)
  ])
  const issueLabels = issue.repository.issue.labels.edges
    .filter((label) => label.node.name === name)

  async.each(issueLabels, async (label) => {
    const { node: { name, description } } = label
    switch(description) {
      case 'project':
        await addToProject(project, issue, variables)
        break
      case 'status':
        await moveProjectCard(name, issue, variables)
        break
      default:
    }
  })
}

module.exports = labeled
