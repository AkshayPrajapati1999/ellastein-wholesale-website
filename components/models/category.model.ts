import { IGraphDataModel } from "./common.model";

export interface ICategory {
  categoryId: number;
  categoryName: string;
  subCategories: ISubCategory[];
}

export interface ISubCategory {
  categoryId: number;
  subCategoryId: number;
  subCategoryName: string;
}

export type ICategorySubCategoryModel = {
  category: IGraphDataModel<ICategory[]>;
  subCategory: IGraphDataModel<ISubCategory[]>;
 
};

