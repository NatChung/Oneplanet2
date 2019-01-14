import gql from 'graphql-tag'

export const getUser = gql`
query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    nickname
  }
}
`