import { IGraphDataModel } from "./common.model";

export interface Product {
  img: string;
  title: string;
  price: number;
  id: number;
  category: string;
  subcategory: string;
  productPrice: string;
  variantWholesalePrice: string;
  productName: string;
  productImage: string;
  productId: Number;
}

export type IProductModel = {
  product: IGraphDataModel<Product[]>;

};

