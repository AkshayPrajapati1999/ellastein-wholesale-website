/* eslint-disable @next/next/no-img-element */
"use client";

import { IOrder } from "@/components/models/order.model";
import { GetOrderHistory } from "@/service/graphql/query/order.query";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import Loading from "../loading";

export default function Order() {
  const { loading, error, data } = useQuery(GetOrderHistory);
  const order = data?.orderHistory?.graphdata;

  return (
    <>
      {loading ? <Loading /> : null}
      <div className="custom_Container">
        <div className="custom_Inner_Container">
          <div className="sub_Navbar">
            <Link href="/" className="sub_Navbar_Link">
              HOME
            </Link>
            <p className="sub_Navbar_Current_Page">ORDER HISTORY</p>
          </div>
          <div className="horizontal_Line"></div>
          <div className="header_Div">
            <label className="text-[1.7rem]">ORDER HISTORY</label>
          </div>

          <table className="cart_Table">
            <thead>
              <tr className="table_Header w-full">
                <th className="table_Header_Content1 w-2">Product Image</th>
                <th className="table_Header_Content1 w-96">Product</th>
                <th className="table_Header_Content1 w-20">Price</th>
                <th className="table_Header_Content1">Quantity</th>
                <th className="table_Header_Content1">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {order?.map((item: IOrder) => {
                return (
                  <>
                    {item.orderDetails.map((detail: any) => (
                      <tr className="border-b-2 text-sm" key={detail.productId}>
                        <th className="py-5">
                          <img
                            className="ml-5 mr-32 size-16"
                            src={detail.productImage}
                            alt={detail.productName}
                          />
                        </th>
                        <td className="text-center">
                          <div className="font-medium flex flex-col">
                            <label htmlFor="">{detail.sku}</label>
                            <Link href="" className=" no-underline">
                              {detail.productName}
                            </Link>
                          </div>
                        </td>
                        <td className="text-center">${detail.price}</td>
                        <td className="text-center">{detail.quantity}</td>
                        <td className="text-center">${detail.quantity * detail.price}</td>
                      </tr>
                    ))}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
