import { DocumentNode, gql } from "@apollo/client";

export const getAllProducts = (
  categoryId: number,
  subCategoryId: number
): DocumentNode => {
  return gql`
    query Products {
      products(categoryId: 0, subCategoryId: 0, count: 4) {
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

export const getAllProductsList = (
  categoryId: number,
  subCategoryId: number
): DocumentNode => {
  return gql`
    query Products {
      products(categoryId: 0, subCategoryId: 0) {
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

export const getAllCategory = (): DocumentNode => {
  return gql`
    query AllCategoriesWithSubCategories {
      allCategoriesWithSubCategories {
        message
        statusCode
        graphdata {
          categoryId
          categoryName
          subCategories {
            categoryId
            subCategoryId
            subCategoryName
          }
        }
      }
    }
  `;
};

export const getAllCategorys = (): DocumentNode => {
  return gql`
    query AllCategories {
      allCategories {
        message
        statusCode
        graphdata {
          categoryId
          categoryName
          isDeleted
        }
      }
    }
  `;
};
export const getSubCategoryByCategoryId = (
  categoryId: number
): DocumentNode => {
  return gql`
  query SubCategoryByCategoryId {
    subCategoryByCategoryId(categoryId: ${categoryId}) {
        message
        statusCode
        graphdata {
          subCategoryId
          categoryId
          subCategoryName
          isDeleted
        }
    }
}
  `;
};
