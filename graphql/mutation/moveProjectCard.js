module.exports = `
  mutation MoveProjectCard($card: MoveProjectCardInput!) {
    moveProjectCard(input: $card) {
      cardEdge {
        node {
          id
        }
      }
      clientMutationId
    }
  }
`
