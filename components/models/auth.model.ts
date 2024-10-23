import { IGraphDataModel } from "./common.model";

export interface ILogin{
    email:string;
    password:string;
}

export type ILoginModel = {
    login: IGraphDataModel<ILogin[]>;

  };
  