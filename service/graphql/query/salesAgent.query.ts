import { DocumentNode, gql } from "@apollo/client";

export const UserUnderSalesAgent = gql`
  query UserUnderSalesAgent {
    userUnderSalesAgent {
      message
      statusCode
      graphdata {
        userId
        storeName
      }
    }
  }
`;

export const AllRetailUsers = gql`
  query AllRetailUsers {
    allRetailUsers {
      message
      statusCode
      graphdata {
        userId
        storeName
      }
    }
  }
`;
