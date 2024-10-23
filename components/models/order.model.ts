import { IGraphDataModel } from "./common.model";

export interface IOrder {
  id: number;
  productImage: string;
  orderDetails: any;
}

export type IOrderModel = {
  orderItem: IGraphDataModel<IOrder[]>;
};
