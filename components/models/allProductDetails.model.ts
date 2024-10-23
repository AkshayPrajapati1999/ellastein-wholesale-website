import { IGraphDataModel } from "./common.model";

export interface ProductDetails {
    productId: string;
    categoryId: string;
    categoryName: string;
    subCategoryId: string;
    subCategoryName: string;
    productName: string;
    productDescription: string;
    code: string;
    variants: {
        productVariantId: string;
        productVariantName: string;
        productVariantValues: string[];
        isDefault: boolean;
    };
    variantCombination: {
        combinationId: string;
        price: number;
        variantWholesalePrice: number;
        variantSKU: string;
        quantity: number;
        isDefault: boolean;
        combinations: {
            key: string;
            value: string;
        };
    };
    images: {
        id: string;
        imageUrl: string;
        isDefault: boolean;
    };
}

 export interface IProductByIds {
    productId: number;
    productImage: string;
    productPrice: number;
    variantWholesalePrice: number;
    productName: string;
}



export type IproductDetailsMOdel = {
  productDetails: IGraphDataModel<ProductDetails[]>;
  IProductByIds: IGraphDataModel<IProductByIds[]>;
};
