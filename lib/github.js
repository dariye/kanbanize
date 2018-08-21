const async = require('async')
const Github = require('github-api')
const { GraphQLClient } = require('graphql-request')
const { query, mutation } = require('../graphql')
const config = require('../config')

const { token, repo, owner } = config.github
const issues = new Github({ token }).getIssues(`${owner}/${repo}`)
const graphqlClient = new GraphQLClient('https://api.github.com/graphql', {
  headers: { Authorization: `bearer ${token}`, }
})

const baseVariables = { owner, name: repo }

const removeDups = async ({ label, issue }) => {
  if (!label) return
  if (!issue) return

  const issueLabels = issue.repository.issue.labels.edges
    .map(label => {
      return {
        name: label.node.name,
        description: label.node.description
      }
    })

  const dups = issueLabels.filter(l =>
    l.name !== label.node.name && l.description === label.node.description)
      .map(l => l.name)

  if (dups.length > 0) {
    const labels = issueLabels.map(l => l.name).filter(l => !dups.includes(l))
    await issues.editIssue(issue.repository.issue.number, { labels })
  }
}

const addProjectCard = async ({ label, issue, project, variables }) => {
  if (!project || project.repository.projects.edges.length === 0) return
  if (!issue) return
  if (!variables) return
  if (!label) return
  
  try {
    await removeDups({ label, issue }) // Remove duplicate labels
  } catch (err) {
    console.log(err)
  }

  const { repository: { issue: { id: contentId } } } = issue
  const projectColumnId = project.repository.projects.edges[0].node.columns.edges[0].node.id || null

  if (contentId && projectColumnId) {
    try {
      await graphqlClient.request(mutation.addProjectCard,
        Object.assign({}, variables, {
          "issue": { contentId, projectColumnId }
        })
      )
    } catch (err) {
      console.log(err)
    }
  }
}

const deleteProjectCard = async ({ card }) => {
  if (!card || !card.id) return
  const { id: cardId } = card || null
  await graphqlClient.request(mutation.deleteProjectCard,
    Object.assign({}, baseVariables, {
    "card": { cardId }
    })
  )
}

const moveProjectCard = async ({ label, issue, variables }) => {
  if (!label) return
  if (!issue) return
  if (!variables) return

  try {
    await removeDups({ label, issue }) // Remove duplicate issues
  } catch (err) {
    console.log(err)
  }

  const { repository: { issue: { projectCards } } }  = issue

  async.each(projectCards.edges, async ({ node: {
    id: cardId,
    project: { name: projectName },
    column: { id: currentColumnId, name: currentColumnName } }
  }) => {
    const project = await graphqlClient.request(query.findProjectColumns,
      Object.assign({}, variables, { projectName })
    )
    const { repository: { projects: { edges } } } = project

    async.each(edges, async ({ node: { columns: { edges } } }) => {
      async.each(edges, async ({ node: { id: columnId, name: columnName } }) => {
        if (columnId === currentColumnId) return
        if (columnName.toLowerCase() === currentColumnName.toLowerCase()) return
        if (columnName.toLowerCase() !== label.node.name.toLowerCase()) return

        const projectCardMutationVariables = Object.assign({}, variables, {
          "card": { cardId, columnId }
        })
        try {
          await graphqlClient.request(mutation.moveProjectCard,
            projectCardMutationVariables)
        } catch (err) {
          console.log(err)
        }
      })
    })
  })
}

module.exports = {
  baseVariables,
  issues,
  graphqlClient,
  addProjectCard,
  moveProjectCard,
  deleteProjectCard
}
