const addProjectCard = `
  mutation AddProjectCard($issue: AddProjectCardInput!) {
      addProjectCard(input: $issue) {
        cardEdge {
          node {
            id
          }
        }
        projectColumn {
          id
        },
        clientMutationId
      }
    }
  `
module.exports = addProjectCard

