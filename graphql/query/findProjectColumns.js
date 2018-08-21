module.exports = `
  query FindProjectColumns($owner: String!, $name: String!, $projectName: String!) {
    repository(owner: $owner, name: $name) {
      projects(first: 2, search: $projectName){
        edges {
          node {
            id
            name
            columns(first: 20) {
              edges {
                node {
                  id
                  name
                  cards(first: 100) {
                    edges {
                      node {
                        id
                        content
                        column {
                          id
                          name
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

