// eslint-disable
// this is an auto generated file. This will be overwritten

export const getFbExtEmail = `query GetFbExtEmail($id: ID!) {
  getFbExtEmail(id: $id) {
    id
    email
    sub
  }
}
`;
export const listFbExtEmails = `query ListFbExtEmails(
  $filter: ModelFbExtEmailFilterInput
  $limit: Int
  $nextToken: String
) {
  listFbExtEmails(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      email
      sub
    }
    nextToken
  }
}
`;
export const getWechatExtEmail = `query GetWechatExtEmail($id: ID!) {
  getWechatExtEmail(id: $id) {
    id
    email
    sub
  }
}
`;
export const listWechatExtEmails = `query ListWechatExtEmails(
  $filter: ModelWechatExtEmailFilterInput
  $limit: Int
  $nextToken: String
) {
  listWechatExtEmails(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      email
      sub
    }
    nextToken
  }
}
`;
export const getTwitterExtEmail = `query GetTwitterExtEmail($id: ID!) {
  getTwitterExtEmail(id: $id) {
    id
    email
    sub
  }
}
`;
export const listTwitterExtEmails = `query ListTwitterExtEmails(
  $filter: ModelTwitterExtEmailFilterInput
  $limit: Int
  $nextToken: String
) {
  listTwitterExtEmails(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      email
      sub
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    nickname
    avatar {
      bucket
      region
      key
    }
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      nickname
      avatar {
        bucket
        region
        key
      }
    }
    nextToken
  }
}
`;
