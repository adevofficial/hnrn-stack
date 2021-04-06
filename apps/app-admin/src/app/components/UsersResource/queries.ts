import gql from 'graphql-tag';
import { GET_LIST } from 'ra-core';

export const GET_LIST_USERS = gql`
  {
    id
    display_name
    created_at
    account {
      email
      active
      default_role
    }
  }
`;

export default {
  [GET_LIST]: GET_LIST_USERS,
};
