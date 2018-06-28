module.exports = {
  FindProject: `
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
  `,
  FindProjectColumns: `
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
  `,
  FindIssue: `
    query FindIssue($owner: String!, $name: String!, $number: Int!) {
      repository(owner: $owner, name: $name) {
        issue(number: $number) {
          id
          title
          projectCards(first: 20) {
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
  `,
  AddProjectCard: `
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
  `,
  MoveProjectCard: `
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
  `,
  AddComment: `
    mutation AddComment($issue: AddCommentInput!) {
      addComment(input:$issue) {
        commentEdge {
          node {
            id
          }
        }
        clientMutationId
      }
    }
  `,
  DeleteProjectCard: `
    mutation DeleteProjectCard($card: DeleteProjectCardInput!) {
      deleteProjectCard(input: $card) {
        deletedCardId
      }
    }
  `,
  FindAllIssues: `
    query FindAllIssues($owner: String!, $name: String!, $order: IssueOrder!, $initial: Boolean = true, $hasNextPage: Boolean = false, $cursorId: String!) {
      repository(owner: $owner, name: $name) {
        ...@skip(if: $initial) {
          issues(first: 20, orderBy: $order, after: $cursorId) {
            totalCount
            edges {
              node {
                id
                number
                closed
                closedAt
                labels (first: 10) {
                  edges {
                    node {
                      id
                      description
                      name
                    }
                  }
                }
                projectCards(first: 2) {
                  edges {
                    node {
                      id
                      project {
                        id
                        name
                      }
                    }
                  }
                }
              }
              cursor
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
        ...@skip (if: $hasNextPage) {
          issues(first: 20, orderBy: $order ) {
            totalCount
            edges {
              node {
                id
                number
                closed
                closedAt
                labels (first: 10) {
                  edges {
                    node {
                      id
                      description
                      name
                    }
                  }
                }
                closedAt
                projectCards(first: 2) {
                  edges {
                    node {
                      id
                      content
                      project {
                        id
                        name
                      }
                    }
                  }
                }
              }
              cursor
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      }
    }
  `
}

