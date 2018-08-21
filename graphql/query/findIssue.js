module.exports = `
  query FindIssue($owner: String!, $name: String!, $number: Int!) {
    repository(owner: $owner, name: $name) {
      issue(number: $number) {
        id
        number
        title
        projectCards(first: 100) {
          edges {
            node {
              id
              project {
                id
                name
              }
              column {
                id
                name
              }
            }
          }
        }
        labels(first: 100) {
          edges {
            node {
              id
              name
              description
            }
          }
        }
      }
    }
  }
`
