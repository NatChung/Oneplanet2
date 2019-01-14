import gql from 'graphql-tag'

export const createUser = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      nickname,
      avatar {
        key
      }
    }
}
`
