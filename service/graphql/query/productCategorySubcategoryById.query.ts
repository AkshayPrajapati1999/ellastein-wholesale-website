import { DocumentNode, gql } from "@apollo/client";

export const getProductDetailsById = (productId: number): DocumentNode => {
  return gql`
  query ProductDetail {
    productDetail(productId: ${productId}) {
        message
        statusCode
        graphdata {
            productId
            categoryId
            categoryName
            subCategoryId
            subCategoryName
            productName
            productDescription
            code
            variantCombination {
                combinationId
                price
                variantWholesalePrice
                variantSKU
                quantity
                isDefault
                combinations {
                    key
                    value
                }
            }
            variants {
                productVariantId
                productVariantName
                productVariantValues
                isDefault
            }
            images {
                id
                imageUrl
                isDefault
            }
        }
    }
  }
  `;
};
