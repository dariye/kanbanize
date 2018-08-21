module.exports = `
  mutation DeleteProjectCard($card: DeleteProjectCardInput!) {
    deleteProjectCard(input: $card) {
      deletedCardId
    }
  }
`
