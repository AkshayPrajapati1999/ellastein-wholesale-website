import { IGraphDataModel } from "./common.model";

export interface ICartItem {
  cartId: string;
  cartDetailId: string;
  productId: string;
  productName: string;
  productImage: string;
  sku: string;
  price: number;
  quantity: number;
  combinations: Combination[];
}

interface Combination {
  key: string;
  value: string;
}

export type ICategorySubCategoryModel = {
  cartItems: IGraphDataModel<ICartItem[]>;
};
