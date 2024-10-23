import { gql } from "@apollo/client";

export const ResetPasswordQuery = () => gql`
  mutation ResetPassword(
    $userId: String!
    $oldPassword: String!
    $newPassword: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      model: {
        userId: $userId
        oldPassword: $oldPassword
        newPassword: $newPassword
        confirmPassword: $confirmPassword
      }
    ) {
      message
      statusCode
    }
  }
`;

export const AddSignUp = () => gql`
  mutation SignUp(
    $storeName: String!
    $userRoleName: String!
    $email: String!
    $password: String!
    $salesAgentId: String
    $confirmPassword: String!
    $numberOfDoors: Int
    $customerCode: String
    $contactPerson: String!
    $secondaryEmailID1: String
    $secondaryEmailID2: String
    $secondaryEmailID3: String
    $salesTaxIdOrEinNumber: String!
    $customerSince: DateTime
    $paymentTerms: String
    $contactNumber: String!
    $primarySalesChannel: Int
    $platformWebsite: String
    $storeType: [Int!]
    $instagramLink: String
    $facebookLink: String
    $tiktokLink: String
    $userMessage: String
    $addressLine1: String!
    $addressLine2: String!
    $city: String!
    $state: String!
    $country: String!
    $countryCode: String!
    $postalCode: String!
    $isDefault: Boolean!
  ) {
    signUp(
      signUpRequestModel: {
        storeName: $storeName
        userRoleName: $userRoleName
        email: $email
        password: $password
        salesAgentId: $salesAgentId
        confirmPassword: $confirmPassword
        customerSince: $customerSince
        numberOfDoors: $numberOfDoors
        customerCode: $customerCode
        contactPerson: $contactPerson
        secondaryEmailID1: $secondaryEmailID1
        secondaryEmailID2: $secondaryEmailID2
        secondaryEmailID3: $secondaryEmailID3
        salesTaxIdOrEinNumber: $salesTaxIdOrEinNumber
        paymentTerms: $paymentTerms
        contactNumber: $contactNumber
        primarySalesChannel: $primarySalesChannel
        platformWebsite: $platformWebsite
        storeType: $storeType
        instagramLink: $instagramLink
        facebookLink: $facebookLink
        tiktokLink: $tiktokLink
        userMessage: $userMessage
        userShippingAddress: {
          addressLine1: $addressLine1
          addressLine2: $addressLine2
          city: $city
          state: $state
          country: $country
          countryCode: $countryCode
          postalCode: $postalCode
          isDefault: $isDefault
        }
      }
    ) {
      message
      statusCode
    }
  }
`;

export const AllSalesChannel = gql`
  query AllSalesChannel {
    allSalesChannel {
      message
      statusCode
      graphdata {
        id
        name
        isDeleted
      }
    }
  }
`;

export const AllStoreType = gql`
  query AllStoreType {
    allStoreType {
      message
      statusCode
      graphdata {
        id
        name
        isDeleted
      }
    }
  }
`;

export const SalesAgents = gql`
  query SalesAgents {
    salesAgents {
      message
      statusCode
      graphdata {
        userId
        storeName
        email
      }
    }
  }
`;
