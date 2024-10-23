import { DocumentNode, gql } from "@apollo/client";

export const getAllProductById = (
  categoryId: number,
  subCategoryId: number,
  page: number,
  count: number
): DocumentNode => {
  return gql`
    query Products {
        products(categoryId: ${categoryId}, subCategoryId: ${subCategoryId}, page: ${page}, count: ${count}) {
            totalPages
            totalProductsCount
            message
            statusCode
            graphdata {
                productId
                productImage
                productPrice
                variantWholesalePrice
                productName
            }
        }
    }
      
    `;
};
