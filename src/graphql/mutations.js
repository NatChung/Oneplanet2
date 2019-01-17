// eslint-disable
// this is an auto generated file. This will be overwritten
import gql from 'graphql-tag'
export const createFbExtEmail = gql`mutation CreateFbExtEmail($input: CreateFbExtEmailInput!) {
  createFbExtEmail(input: $input) {
    id
    email
    sub
  }
}
`;
export const updateFbExtEmail = gql`mutation UpdateFbExtEmail($input: UpdateFbExtEmailInput!) {
  updateFbExtEmail(input: $input) {
    id
    email
    sub
  }
}
`;
export const deleteFbExtEmail = gql`mutation DeleteFbExtEmail($input: DeleteFbExtEmailInput!) {
  deleteFbExtEmail(input: $input) {
    id
    email
    sub
  }
}
`;
export const createWechatExtEmail = gql`mutation CreateWechatExtEmail($input: CreateWechatExtEmailInput!) {
  createWechatExtEmail(input: $input) {
    id
    email
    sub
  }
}
`;
export const updateWechatExtEmail = gql`mutation UpdateWechatExtEmail($input: UpdateWechatExtEmailInput!) {
  updateWechatExtEmail(input: $input) {
    id
    email
    sub
  }
}
`;
export const deleteWechatExtEmail = gql`mutation DeleteWechatExtEmail($input: DeleteWechatExtEmailInput!) {
  deleteWechatExtEmail(input: $input) {
    id
    email
    sub
  }
}
`;
export const createTwitterExtEmail = gql`mutation CreateTwitterExtEmail($input: CreateTwitterExtEmailInput!) {
  createTwitterExtEmail(input: $input) {
    id
    email
    sub
  }
}
`;
export const updateTwitterExtEmail = gql`mutation UpdateTwitterExtEmail($input: UpdateTwitterExtEmailInput!) {
  updateTwitterExtEmail(input: $input) {
    id
    email
    sub
  }
}
`;
export const deleteTwitterExtEmail = gql`mutation DeleteTwitterExtEmail($input: DeleteTwitterExtEmailInput!) {
  deleteTwitterExtEmail(input: $input) {
    id
    email
    sub
  }
}
`;
export const createUser = gql`mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    nickname
    avatar {
      bucket
      region
      key
    }
    type
  }
}
`;
export const updateUser = gql`mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    nickname
    avatar {
      bucket
      region
      key
    }
    type
  }
}
`;
export const deleteUser = gql`mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    nickname
    avatar {
      bucket
      region
      key
    }
    type
  }
}
`;
