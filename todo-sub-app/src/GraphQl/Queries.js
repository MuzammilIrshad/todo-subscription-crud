import React from "react";

import { gql } from "@apollo/client";

export const LOAD_USERS = gql`
  query AllData {
    allData {
      name
      id
    }
  }
`;
export const DEL_USERS = gql`
  query ($deletedDataId: ID!) {
    deletedData(id: $deletedDataId) {
      name
      id
    }
  }
`;
