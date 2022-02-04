
import React from 'react'

import { gql } from "@apollo/client";

export const SUBSCRIBE_USER_ADDED = gql`
  subscription {
    newData {
      name
      id
    }
  }
`;
export const SUBSCRIBE_USER_DELETED = gql`

subscription {
  delData {
    id
    name
  }
}

`;
export const SUBSCRIBE_USER_UPDATED = gql`

subscription {
  updateData {
    name
    id
  }
}

`;