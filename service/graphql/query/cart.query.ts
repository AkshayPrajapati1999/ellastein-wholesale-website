import { UserRoles } from "@/components/models/user.model";
import { useAppSelector } from "@/redux/hook";
import { DocumentNode, gql } from "@apollo/client";

export const GetAllCart = (retailUserId: string | null): DocumentNode => {
  const { userRole } = useAppSelector((state) => state.auth);
  if (userRole === UserRoles.RETAILER) {
    return gql`
      query CartDetails {
        cartDetails(retailUserId: null) {
          totalAmount
          totalQuantity
          message
          statusCode
          graphdata {
            cartId
            cartDetailId
            productId
            productName
            productImage
            sku
            variantWholesalePrice
            quantity
            combinations {
              key
              value
            }
          }
        }
      }
    `;
  } else {
    return gql`
    query CartDetails {
      cartDetails(retailUserId: "${retailUserId}") {
        totalAmount
        totalQuantity
        message
        statusCode
        graphdata {
          cartId
          cartDetailId
          productId
          productName
          productImage
          sku
          variantWholesalePrice
          quantity
          combinations {
            key
            value
          }
        }
      }
    }
  `;
  }
};

export const AddToCart = gql`
  mutation AddToCart(
    $productId: Int!
    $productCombinationPriceId: Int!
    $discount: Float!
    $coupon: String!
    $quantity: Int!
    $retailUserId: String!
  ) {
    addToCart(
      model: {
        productId: $productId
        discount: $discount
        productCombinationPriceId: $productCombinationPriceId
        coupon: $coupon
        quantity: $quantity
        retailUserId: $retailUserId
      }
    ) {
      message
      statusCode
    }
  }
`;

export const DeleteCartById: DocumentNode = gql`
  mutation DeleteCartDetailByCartDetailId($cartDetailId: Int!) {
    deleteCartDetailByCartDetailId(cartDetailId: $cartDetailId) {
      message
      statusCode
    }
  }
`;

export const DeleteAllCart: DocumentNode = gql`
  mutation DeleteCart($retailUserId: String!) {
    deleteCart(retailUserId: $retailUserId) {
      message
      statusCode
    }
  }
`;

export const ChangeQuantity: DocumentNode = gql`
  mutation UpdateQuantity($cartDetailId: Int!, $quantity: Int!) {
    updateQuantity(cartDetailId: $cartDetailId, quantity: $quantity) {
      message
      statusCode
    }
  }
`;

export const GetCartAmount = (retailUserId: string): DocumentNode => {
  const { userRole } = useAppSelector((state) => state.auth);
  if (userRole === UserRoles.RETAILER) {
    return gql`
      query CartAmount {
        cartAmount(cartPriceTypeEnum: WHOLE_SALE_PRICE, retailUserId: null) {
          graphdata
          message
          statusCode
        }
      }
    `;
  } else {
    return gql`
      query CartAmount {
        cartAmount(cartPriceTypeEnum: WHOLE_SALE_PRICE, retailUserId: "${retailUserId}") {
            graphdata
            message
            statusCode
        }
    }
  `;
  }
};
