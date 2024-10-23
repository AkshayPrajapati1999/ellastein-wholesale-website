"use client";
import StripePayment from "@/components/StripePayment";
import { useAppSelector } from "@/redux/hook";
import {
  AllAddAddress,
  getAddress,
  makePaymentQuery,
} from "@/service/graphql/query/makePayment.query";
import { useMutation, useQuery } from "@apollo/client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { useState } from "react";
import "reactjs-popup/dist/index.css";

import { CookieKeys, getCookie } from "@/components/models/cookie.model";
import { ICity, ICountry, IState } from "@/components/models/country.model";
import { UserRoles } from "@/components/models/user.model";

import { AddAddress } from "@/components/shared/AddAddress";
import CityDropDown from "@/components/shared/CityDropDown";
import CountryDropDown from "@/components/shared/CountryDropDown";
import StateDropDown from "@/components/shared/StateDropDown";
import { graphQlMapper } from "@/service/graphql/graphql-mapper.service";
import { GraphQlKeyEnum } from "@/service/graphql/graphql-query.enum";
import { getCountry } from "@/service/graphql/query/country.query";
import Loading from "../loading";

export default function ConfirmOrder() {
  const { userRole } = useAppSelector((state) => state.auth);
  const [showDiv, setShowDiv] = useState(false);
  const [address, setAddress] = useState(Object);
  const [showModel, setshowModel] = useState(false);
  const [token, setToken] = useState("false");
  const [startLoading, setStartLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState<any>([]);
  const { total: itemtotal } = useAppSelector((state) => state.cart);
  const userSelectedRetailer = getCookie(CookieKeys.SELECTED_RETAILER);

  const [makePaymentMutation] = useMutation(makePaymentQuery);
  const [countryId, setcountryId] = useState(0);
  const [cityId, setcityId] = useState(0);
  const [stateId, setstateId] = useState(0);
  // const [state, setState] = useState();
  const [addAddressMutation] = useMutation(AllAddAddress);
  const [country, setCountry] = useState<ICountry>();
  const [state, setState] = useState<IState>();
  const [city, setCity] = useState<ICity>();

  const {
    data,
    loading,
    error,
    refetch: refetchShipping,
  } = useQuery(getAddress, {
    variables: {
      retailUserId:
        userRole === UserRoles.RETAILER ? null : userSelectedRetailer,
    },
  });

  const countryData = graphQlMapper<ICountry[]>(
    GraphQlKeyEnum.country,
    getCountry()
  );
  const shippingData = data?.address?.graphdata;

  const onCountryChange = (value: ICountry) => {
    setCountry(value);
  };

  const onStateChange = (value: IState) => {
    setState(value);
  };

  const onCityChange = (value: ICity) => {
    setCity(value);
  };

  const handleRadioChange = () => {
    setShowDiv(!showDiv);
  };

  const handleSendOrder = async () => {
    setStartLoading(true);
    try {
      const { data } = await makePaymentMutation({
        variables: {
          paymentMethodId: token,
          shippingAddressId: selectedValue,
          retailUserId:
            userRole === UserRoles.RETAILER ? null : userSelectedRetailer,
        },
      });
      if (data?.makePayment?.statusCode === "OK") {
        window.location.href = "/thankyou";
      }
    } catch (error) {
      console.error("Error making payment:", error);
    } finally {
      setStartLoading(false);
    }
  };
  const handleSelectChange = (event) => {
    var country = event.target.value;
    const state = event.target.value;

    setstateId(country);
    setcityId(country);
    setState(state);

    setSelectedValue(parseInt(country));
    if (country === "addNew") {
      setshowModel(true);
    } else {
      setshowModel(false);
    }
  };

  const handleCountrychange = (e) => {
    setcountryId(e.target.value);
    setcityId(0);
    setstateId(0);
  };

  const handleStatechange = (e) => {
    setstateId(e.target.value);
    setcityId(0);
  };

  const handleCitychange = (e) => {
    setcityId(e.target.value);
  };

  const submitData = async (event) => {
    setStartLoading(true);
    event.preventDefault();
    const formData = new FormData(event.target);

    let countryId = "";
    let countryCode = "";
    if (formData.get("country")) {
      countryId = formData.get("country")!.toString().split("|")[0];
      countryCode = formData.get("country")!.toString().split("|")[1];
    }

    const model = {
      addressLine1: formData.get("addressLine1") || "",
      addressLine2: formData.get("addressLine2") || "",
      city: formData.get("city") || "",
      state: formData.get("state") || "",
      country: countryId,
      countryCode: countryCode,
      postalCode: formData.get("postalCode") || "",
      isDefault: true,
    };
    setAddress(model);

    try {
      await addAddressMutation({
        variables: {
          ...model,
        },
      }).then(() => {
        refetchShipping();
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setStartLoading(false);
    }
  };
  const stripePromise = loadStripe(
    "pk_test_51OoOvhI9OWDq5qov4TtRpvLrstYiJtxHxyWYKGwrrAa5N0E72tBhiRD82w7LCHG9x8jlGInaJOmQSqMXPdU1w2kO00d9SKeolt"
  );

  const shippingAddressDetails = shippingData?.filter(
    (data) => data.id == selectedValue
  );

  return (
    <>
      {loading || startLoading ? <Loading /> : null}
      <div className="custom_Container">
        <div className="custom_Inner_Container">
          <div className="sub_Navbar">
            <Link href="/" className="sub_Navbar_Link">
              HOME
            </Link>
            <label className="sub_Navbar_Current_Page">CONFIRM ORDER</label>
          </div>

          <div className="horizontal_Line"></div>
          <h1 className="confirm_Order_Title">CONFIRM ORDER</h1>

          <div className="confirm_Order_Main_Div">
            <label className="block text-[#657285] text-sm">
              DELIVERY ADDRESS
            </label>

            <div className="confirm_Order_Select_Box">
              <select
                className="confirm_Order_Select_Fild"
                value={shippingData?.country}
                onChange={handleSelectChange}
              >
                <option value="none" selected disabled hidden>
                  select one...
                </option>
                {shippingData?.map((data) => (
                  <>
                    <option value={data?.id}>
                      {data?.country} {data?.addressLine1} {data?.addressLine2}
                    </option>
                  </>
                ))}

                <option
                  value={"addNew"}
                  onClick={() => {
                    setshowModel(true);
                  }}
                >
                  Add new
                </option>
              </select>

              {showModel && (
                <AddAddress
                  showModel={showModel}
                  setShowModel={setshowModel}
                  submitData={submitData}
                />
              )}
            </div>
            {shippingAddressDetails ? (
              <div className="confirm_Order_Addresses_Box">
                <div className="flex flex-col">
                  <label>ADDRESS 1</label>
                  <input
                    value={
                      shippingAddressDetails[0]?.addressLine1 ||
                      address?.addressLine1
                    }
                    className="confirm_Order_Disabled"
                    disabled
                  ></input>
                </div>
                <div className="flex flex-col">
                  <label>ADDRESS 2</label>
                  <input
                    value={
                      shippingAddressDetails[0]?.addressLine2 ||
                      address.addressLine2
                    }
                    className="confirm_Order_Disabled"
                    disabled
                  ></input>
                </div>
                <div className="flex flex-col">
                  <label>POSTAL CODE</label>
                  <input
                    value={
                      shippingAddressDetails[0]?.postalCode ||
                      address.postalCode
                    }
                    className="confirm_Order_Disabled"
                    disabled
                  ></input>
                </div>
                <div className="flex flex-col">
                  <label>CITY</label>
                  <input
                    value={shippingAddressDetails[0]?.city || address.city}
                    className="confirm_Order_Disabled"
                    disabled
                  ></input>
                </div>
                <div className="flex flex-col">
                  <label>COUNTRY</label>
                  <select className="confirm_Order_Disabled " disabled>
                    <option>
                      {shippingAddressDetails[0]?.country || address.country}
                    </option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="confirm_Order_Addresses_Box">
                <div className="flex flex-col">
                  <label>ADDRESS 1</label>
                  <input className="confirm_Order_Disabled" disabled></input>
                </div>
                <div className="flex flex-col">
                  <label>ADDRESS 2</label>
                  <input className="confirm_Order_Disabled" disabled></input>
                </div>
                <div className="flex flex-col">
                  <label>POSTAL CODE</label>
                  <input className="confirm_Order_Disabled" disabled></input>
                </div>
                <div className="flex flex-col">
                  <label>CITY</label>
                  <input className="confirm_Order_Disabled" disabled></input>
                </div>
                <div className="flex flex-col">
                  <label>COUNTRY</label>
                  <select className="confirm_Order_Disabled px-1 py-1" disabled>
                    <option>India</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="horizontal_Line"></div>
          <div className="confirm_Order_Main_Div text-[#657285] ">
            <label>Payment option</label>
            <br />
            <div>
              <input
                type="radio"
                name="paymentMethod"
                id="creditCardRadio"
                className="m-2"
                onChange={handleRadioChange}
              />
              <label htmlFor="creditCardRadio">CREDIT CARD (WITH STRIPE)</label>
            </div>
          </div>
          <div className="horizontal_Line"></div>

          {showDiv && (
            <div>
              <div className="confirm_Order_Main_Div">
                <div className=" bg-[#fafafa] px-9 py-6 my-10">
                  <Elements stripe={stripePromise}>
                    <StripePayment setToken={setToken} />
                  </Elements>
                </div>
                <form onSubmit={submitData}>
                  <div className=" text-[#657285] text-sm">
                    <h1 className="text-2xl text-black font-normal mb-8">
                      Billing Address Details
                    </h1>
                    <label>ADDRESS 1</label>
                    <input
                      name="addressLine1"
                      className="confirm_Order_Input"
                      type="text"
                    />
                    <label>ADDRESS 2</label>
                    <input
                      name="addressLine2"
                      className="confirm_Order_Input"
                      type="text"
                    />
                    <label>COUNTRY</label>
                    <div className="confirm_Order_Select_Box">
                      <CountryDropDown
                        classList="confirm_Order_Select_Fild"
                        onChange={onCountryChange}
                      ></CountryDropDown>
                    </div>
                    <label>STATE</label>
                    <div className="confirm_Order_Select_Box">
                      {country ? (
                        <StateDropDown
                          onChange={onStateChange}
                          countryId={country.id}
                          classList="confirm_Order_Select_Fild"
                        ></StateDropDown>
                      ) : (
                        <select
                          name="state"
                          disabled
                          className="confirm_Order_Select_Fild"
                        >
                          <option value="none" selected disabled hidden>
                            select one...
                          </option>
                        </select>
                      )}
                    </div>
                    <label>CITY</label>
                    <div className="confirm_Order_Select_Box">
                      {state ? (
                        <CityDropDown
                          onChange={onCityChange}
                          stateId={state.id}
                          classList="confirm_Order_Select_Fild"
                        ></CityDropDown>
                      ) : (
                        <select
                          name="city"
                          disabled
                          className="confirm_Order_Select_Fild"
                        >
                          <option value="none" selected disabled hidden>
                            select one...
                          </option>
                        </select>
                      )}
                    </div>
                    <label>POSTAL CODE</label>
                    <input
                      name="postalCode"
                      className="confirm_Order_Input"
                      type="text"
                    />
                    <div className=" flex justify-end">
                      <button className="confirm_Order_Send" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="horizontal_Line"></div>
            </div>
          )}

          <div className="confirm_Order_Main_Div pt-7 flex justify-between font-bold ">
            <label>Gross total</label>
            <label>${itemtotal}.00</label>
          </div>
          <div className="horizontal_Line"></div>
          <div className="confirm_Order_Main_Div flex flex-col ">
            <label>COMMENTS</label>
            <textarea rows={4} className="confirm_Order_Input" />
            <label>PURCHASE ORDER </label>
            <input className="confirm_Order_Input" type="text" />
          </div>

          <div className="horizontal_Line"></div>
          <div className="confirm_Order_Bottom">
            <Link href="/cart" className="confirm_Order_Back">
              BACK
            </Link>

            <Link
              className={"confirm_Order_Send cursor-pointer"}
              onClick={handleSendOrder}
              href=""
            >
              SEND ORDER
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
