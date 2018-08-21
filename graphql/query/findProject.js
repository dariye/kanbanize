module.exports = `
  query FindProject($owner: String!, $name: String!, $projectName: String!) {
    repository(owner: $owner, name: $name) {
      projects(first: 1, search: $projectName) {
        edges {
          node {
            columns(first: 1) {
              edges {
                node {
                  id
                  name
                  cards(first: 20) {
                    edges {
                      node {
                        id
                        content
                        column {
                          id
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
