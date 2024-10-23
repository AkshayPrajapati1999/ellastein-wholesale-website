import { IGraphDataModel } from "./common.model";

interface ICategorys {
    categoryId: string;
    categoryName: string;
    subCategories: SubCategory[];
}

interface SubCategory {
    categoryId: string;
    subCategoryId: string;
    subCategoryName: string;
}

export interface AllProduct {
    productId: string;
    productImage: string;
    productPrice: number;
    variantWholesalePrice: number;
    productName: string;
}

export interface ICategory {
    categoryId: string;
    categoryName: string;
    isDeleted: boolean;
}

export interface ISubCategory {
    subCategoryId: number;
    categoryId: number;
    subCategoryName: string;
    isDeleted: boolean;
}


export type ICategoryModel = {
    categorys: IGraphDataModel<ICategorys[]>;
    allProduct: IGraphDataModel<AllProduct[]>;
    categorysMailpage:IGraphDataModel<ICategory[]>;
    ISubCategory:IGraphDataModel<ISubCategory[]>;

  };
  