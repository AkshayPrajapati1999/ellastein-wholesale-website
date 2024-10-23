/* eslint-disable @next/next/no-img-element */
"use client";

import { ICartItem } from "@/components/models/cart.model";
import { CookieKeys, getCookie } from "@/components/models/cookie.model";
import { UserRoles } from "@/components/models/user.model";
import { addAmount } from "@/redux/feature/slice/cardSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  ChangeQuantity,
  DeleteAllCart,
  DeleteCartById,
  GetAllCart,
  GetCartAmount,
} from "@/service/graphql/query/cart.query";
import { gql, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Loading from "../loading";
import EmitterService, {
  EventEmitterEvents,
} from "@/service/event-emitter.service";

export default function Cart() {
  const dispatch = useAppDispatch();
  const { userRole } = useAppSelector((state) => state.auth);
  const [userSelectedRetailer, setUserSelectedRetailer] = useState<string>(
    getCookie(CookieKeys.SELECTED_RETAILER)
  );
  const [isValueChanged, setIsValueChanged] = useState(false);
  const [quantity, setQuantity] = useState<number>(0);
  const [updateId, setUpdateId] = useState();
  const [startLoading, setStartLoading] = useState(false);

  const [deleteCartDetail] = useMutation(DeleteCartById);
  const [deleteAllCart] = useMutation(DeleteAllCart);
  const [changeQuantity] = useMutation(ChangeQuantity);
  const { data, loading, error, refetch } = useQuery(
    gql`
      ${GetAllCart(userSelectedRetailer)}
    `
  );

  EmitterService.on(EventEmitterEvents.OnRetailerChange, () => {
    setUserSelectedRetailer(getCookie(CookieKeys.SELECTED_RETAILER));
  });

  // useEffect(() => {
  //   dispatch({ type: "SET_SELECTED_RETAILER", payload: userSelectedRetailer });
  // }, [dispatch, userSelectedRetailer]);

  const cart = data?.cartDetails?.graphdata;

  useEffect(() => {
    refetch();
  }, [refetch, userSelectedRetailer]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id
  ) => {
    const value = parseInt(event.target.value, 10) || 0;
    setQuantity(value);
    setIsValueChanged(true);
    setUpdateId(id);
  };
  const handleDeleteFromCartDetailId = async (cartDetailId: string) => {
    setStartLoading(true);
    try {
      await deleteCartDetail({
        variables: {
          cartDetailId: cartDetailId,
        }
      }).then(() => {
        refetch();
        EmitterService.emit(EventEmitterEvents.UpdateCartAmount, true);
      });
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    } finally {
      setStartLoading(false);
    }
  };
  const handleDeleteAll = async (cartId) => {
    setStartLoading(true);

    try {
      await deleteAllCart({
        variables: {
          retailUserId:
            userRole === UserRoles.RETAILER ? null : userSelectedRetailer,
        }
      }).then(() => {
        refetch();
        EmitterService.emit(EventEmitterEvents.UpdateCartAmount, true);
      });
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    } finally {
      setStartLoading(false);
    }
  };

  const handleButtonClick = async (cartDetailId: string) => {
    try {
      if (cartDetailId !== null && quantity !== 0) {
        setStartLoading(true);
        setIsValueChanged(false);
        await changeQuantity({
          variables: { cartDetailId: cartDetailId, quantity: quantity },
        }).then(() => {
          refetch();
          EmitterService.emit(EventEmitterEvents.UpdateCartAmount, true);
        });
        
      } else {
        console.error("Cart detail ID or quantity is invalid.");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setStartLoading(false);
    }
  };
  let totalQuantity = 0;

  let totalPrice = 0;
  cart?.forEach((item) => {
    totalQuantity += item.quantity;
    totalPrice += item.variantWholesalePrice * item.quantity;
  });

  const amount: any = useQuery(gql`
    ${GetCartAmount(userSelectedRetailer)}
  `);

  const totalAmount = amount?.data?.cartAmount?.graphdata;

  dispatch(addAmount(totalPrice));
  return (
    <>
      {loading || startLoading ? <Loading /> : null}
      <div className="custom_Container">
        <div className="custom_Inner_Container">
          <div className="sub_Navbar">
            <Link href="/" className="sub_Navbar_Link">
              HOME
            </Link>
            <p className="sub_Navbar_Current_Page">CURRENT ORDER</p>
          </div>
          <div className="horizontal_Line"></div>
          <div className="header_Div">
            <label className="text-[1.7rem]">CURRENT ORDER</label>
            <div
              className="delete_All_Button"
              onClick={() => handleDeleteAll(cart[0].retailUserId)}
            >
              DELETE ALL <MdDelete className=" text-lg ml-2" />
            </div>
          </div>

          <table className="cart_Table">
            <thead>
              <tr className="table_Header">
                <th className="table_Header_Content1 w-2">Product Iamge</th>
                <th className="table_Header_Content1 w-96">Product</th>
                <th className="table_Header_Content1 w-20">Price</th>
                <th className="table_Header_Content1">Quantity</th>
                <th className="table_Header_Content1">Discount</th>
                <th className="table_Header_Content1">Total</th>
                <th className="w-2"></th>
              </tr>
            </thead>
            <tbody>
              {cart?.map(
                (item) =>
                  Object?.keys(item).length !== 0 && (
                    <tr className="border-b-2 text-sm" key={item.id}>
                      <td className="text-center">
                        <img
                          src={item.productImage}
                          className="ml-5 mr-32 size-16"
                          alt={item.productName}
                        />
                      </td>
                      <td className="text-center">
                        <div className="font-medium flex flex-col">
                          <label htmlFor="">{item.sku}</label>
                          <Link
                            href="/products/bracelets"
                            className=" no-underline"
                          >
                            {item.productName}
                          </Link>
                          <label htmlFor="">
                            {item.combinations.map(
                              (match) =>
                                Object.keys(match).length !== 0 && (
                                  <div key={match.key}>
                                    {match.key}: {match.value}
                                  </div>
                                )
                            )}
                          </label>
                        </div>
                      </td>
                      <td className="text-center">
                        ${item.variantWholesalePrice}
                      </td>
                      <td className="text-center">
                        <div className="text-center">
                          <input
                            type="text"
                            className="table_Input"
                            defaultValue={item.quantity}
                            onChange={(e) =>
                              handleInputChange(e, item.cartDetailId)
                            }
                          />

                          {isValueChanged && updateId === item.cartDetailId && (
                            <button
                              onClick={() =>
                                handleButtonClick(item.cartDetailId)
                              }
                              className="table_Update_Button"
                            >
                              UPDATE
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="text-center">-</td>
                      <td className="text-center pl-4">
                        <label>
                          ${item.variantWholesalePrice * item.quantity}
                        </label>
                      </td>
                      <td className="p-5 text-center">
                        <div
                          className="delete_One_Button"
                          onClick={() =>
                            handleDeleteFromCartDetailId(item.cartDetailId)
                          }
                        >
                          X
                        </div>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>

          <div className="order_Summary_Section">
            <div className="order_Summary">
              <div className="flex flex-col">
                <label className="order_Summary_Title">TOTAL QUANTITY</label>
                <label className="order_Summary_Data">{totalQuantity}</label>
              </div>
              <div className="flex flex-col">
                <label className="order_Summary_Title">TOTAL</label>
                <label className="order_Summary_Data">${totalPrice}.00</label>
              </div>
              <div className="flex flex-col">
                <label className="order_Summary_Title">VAT</label>
                <label className="order_Summary_Data">$0.00</label>
              </div>
              <div className="flex flex-col">
                <label className="order_Summary_Title">GROSS TOTAL</label>
                <label className="order_Summary_Data">${totalPrice}.00</label>
              </div>
            </div>
            <div>
              <Link href="" className="save_For_Latter_Button">
                SAVE FOR LATER
              </Link>
              <Link href="/confirmorder" className="next_Button">
                NEXT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
