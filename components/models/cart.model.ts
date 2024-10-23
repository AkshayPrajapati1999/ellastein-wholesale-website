import { IGraphDataModel } from "./common.model";

export interface ICartItem {
  retailUserId: any;
  id: string
  cartId: string;
  cartDetailId: string;
  productId: string;
  productName: string;
  productImage: string;
  sku: string;
  variantWholesalePrice: number;
  quantity: number;
  combinations: Combination[];
}

interface Combination {
  key: string;
  value: string;
}


export type ICartModel = {
  cartItem: IGraphDataModel<ICartItem[]>;
 
};
