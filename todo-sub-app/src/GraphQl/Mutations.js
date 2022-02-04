import React from 'react'


import { gql } from '@apollo/client'

export const CREATE_USER_MUTATION = gql`
mutation($name: String!) {
  addData(name: $name) {
    id
    name
  }
}
`;
export const UPDATE_USER_MUTATION = gql`
mutation($name: String!, $editDataId: ID!) {
  editData(name: $name, id: $editDataId) {
    id
    name
  }
}
`;