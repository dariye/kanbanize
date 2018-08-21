module.exports = `
  mutation AddProjectCard($issue: AddProjectCardInput!) {
    addProjectCard(input: $issue) {
      cardEdge {
        node {
          id
        }
      }
      projectColumn {
        id
      }
      clientMutationId
    }
  }
`

