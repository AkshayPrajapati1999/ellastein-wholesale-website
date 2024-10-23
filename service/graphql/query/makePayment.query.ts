import { DocumentNode, gql } from "@apollo/client";

export const getShippingAddress = (): DocumentNode => {
  return gql`
    query ShippingAddress {
      shippingAddress {
        message
        statusCode
        graphdata {
          id
          addressLine1
          addressLine2
          city
          state
          countryCode
          country
          postalCode
        }
      }
    }
  `;
};

export const getAddress = gql`
  query Address($retailUserId: String) {
    address(addressType: SHIPPING, addressid: 0, retailUserId: $retailUserId) {
      message
      statusCode
      graphdata {
        id
        addressLine1
        addressLine2
        city
        state
        countryCode
        country
        postalCode
      }
    }
  }
`;

export const AllAddAddress = gql`
  mutation AddAddress(
    $addressLine1: String!
    $addressLine2: String!
    $city: String!
    $state: String!
    $country: String!
    $countryCode: String!
    $postalCode: String!
    $isDefault: Boolean!
  ) {
    addAddress(
      addressType: SHIPPING
      model: {
        addressLine1: $addressLine1
        addressLine2: $addressLine2
        city: $city
        state: $state
        country: $country
        countryCode: $countryCode
        postalCode: $postalCode
        isDefault: $isDefault
      }
    ) {
      message
      statusCode
    }
  }
`;

export const makePaymentQuery = gql`
  mutation MakePayment(
    $paymentMethodId: String!
    $shippingAddressId: Int!
    $retailUserId: String
  ) {
    makePayment(
      paymentMethodId: $paymentMethodId
      shippingAddressId: $shippingAddressId
      paymentType: FULL_PAYMENT
      retailUserId: $retailUserId
    ) {
      message
      statusCode
      graphdata {
        status
        message
        order {
          id
          orderNumber
          userId
          storeName
          email
          orderDate
          amount
          tax
          totalAmount
          paymentType
          paymentStatus
          isCancel
          isShipped
          orderStatus
          customerCode
          orderFor {
            key
            value
          }
          orderDetails {
            productId
            productName
            productImage
            quantity
            price
            sku
            combinationsData {
              key
              value
            }
          }
        }
      }
    }
  }
`;
