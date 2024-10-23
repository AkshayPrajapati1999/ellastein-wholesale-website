/* eslint-disable @next/next/no-img-element */
"use client";

import Loading from "@/app/loading";
import { CookieKeys, getCookie } from "@/components/models/cookie.model";
import { UserRoles } from "@/components/models/user.model";
import Slider from "@/components/ui/slider";
import { useAppSelector } from "@/redux/hook";
import EmitterService, { EventEmitterEvents } from "@/service/event-emitter.service";
import { AddToCart } from "@/service/graphql/query/cart.query";
import { getProductDetailsById } from "@/service/graphql/query/productCategorySubcategoryById.query";
import { gql, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProductDetailPage = (itemid, props) => {
  const { userRole } = useAppSelector((state) => state.auth);
  const userSelectedRetailer = getCookie(CookieKeys.SELECTED_RETAILER);
  const [quantity, setQuantity] = useState<number | null>(1);
  const [color, setColor] = useState("");
  const [startLoading, setStartLoading] = useState(false);

  const [addToCartMutation] = useMutation(AddToCart);

  const cardId = itemid.params.id;
  const { data, loading, error, refetch } = useQuery(
    gql`
      ${getProductDetailsById(cardId)}
    `
  );
  useEffect(() => {
    refetch();
  }, [refetch]);
  const { accessToken } = useAppSelector((state) => state.auth);

  const products = data?.productDetail?.graphdata;
  const varientArray = products?.variants.map(
    (variant) => variant?.productVariantName
  );
  const productVarientValues = products?.variants.map(
    (variant) => variant?.productVariantValues
  );

  const varientSize = varientArray?.find((variant) => variant === "Size");

  const newImages = products?.images?.map((product) => product?.imageUrl);

  const handleSetQuantity = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleSelectChange = (event) => {
    setColor(event.target.value);
    const combinationId = getPriceByColor(event.target.value);
  };
  const getPriceByColor = (color) => {
    const variantCombination = products?.variantCombination;
    if (variantCombination && Array.isArray(variantCombination)) {
      for (const variant of variantCombination) {
        const combination = variant?.combinations.find(
          (combo) => combo.value === color
        );

        if (combination) {
          return {
            price: variant.price,
            combinationId: variant.combinationId,
            variantWholesalePrice: variant.variantWholesalePrice,
          };
        }
      }
    }
    return null;
  };

  let priceData = getPriceByColor(color);
  let price = priceData?.price;
  let variantWholesalePrice = priceData?.variantWholesalePrice;
  let combinationId = priceData?.combinationId;
  useEffect(() => {
    if (products && products?.variants[0]?.productVariantValues.length > 0) {
      setColor(products.variants[0].productVariantValues[0]);
    }
  }, [products]);

  const addToCart = async () => {
    try {
      setStartLoading(true);
      await addToCartMutation({
        variables: {
          productId: products.productId,
          productCombinationPriceId: combinationId,
          discount: 0,
          coupon: "",
          quantity: quantity,
          retailUserId:
            userRole === UserRoles.RETAILER ? "" : userSelectedRetailer,
        },
      }).then(() => {
        EmitterService.emit(EventEmitterEvents.OnRetailerChange, true);
        EmitterService.emit(EventEmitterEvents.UpdateCartAmount, true);
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setStartLoading(false);
    }
  };

  const productName = products?.productName;
  const FinalProductName = productName?.replace(/-/g, " ").toUpperCase();

  return (
    <div className="custom_Container">
      {loading || startLoading ? <Loading /> : null}
      <div className="custom_Inner_Container">
        <section className="sub_Navbar">
          <button className="sub_Navbar_Link">HOME</button>
          <button className="sub_Navbar_Link">BRACELETS</button>
          <button className="sub_Navbar_Link">CHAIN BRACELET</button>
          <button className="sub_Navbar_Current_Page">
            {FinalProductName}
          </button>
        </section>
        <div className="horizontal_Line"></div>
        <div>
          <main className="product_Details_Main_Div">
            <div className="lg:w-5/12 md:w-5/12">
              <Slider images={newImages} />
            </div>
            <div className="product_Details_Data">
              <h1 className="product_Name">{FinalProductName}</h1>
              <h1 className="product_Availability">Available</h1>
              <div className="flex justify-between">
                <div className="w-3/6">
                  <div className="pb-4">
                    <label className="product_Details_Label">CATEGORY</label>
                    <Link className="product_Details_Value" href="">
                      {products?.categoryName}
                    </Link>
                  </div>
                  <div className="pb-4">
                    <label className="product_Details_Label">BRAND</label>
                    <Link className="product_Details_Value" href="">
                      EllaStein
                    </Link>
                  </div>
                </div>
                <div className="w-3/6">
                  <div className="pb-4">
                    <label className="product_Details_Label">CODE</label>
                    <label className="product_Details_Value">
                      {products?.code}
                    </label>
                  </div>
                  <div className="pb-4">
                    <label className="product_Details_Label">TYPE</label>
                    <label className="product_Details_Value">
                      {FinalProductName}
                    </label>
                  </div>
                </div>
              </div>
              <div className="horizontal_Line"></div>
              {accessToken ? (
                <div className="product_Details_Price_Details">
                  <div className="w-3/6">
                    <h3 className="text-3xl mb-3 text-black font-normal">
                      MSRP $
                      {price ? price : products?.variantCombination[0]?.price}
                    </h3>
                    <h3 className="text-3xl mb-3 text-black font-normal">
                      Wholesale Price $
                      {variantWholesalePrice
                        ? variantWholesalePrice
                        : products?.variantCombination[0]
                            ?.variantWholesalePrice}
                    </h3>
                    <label>{products?.variants[0]?.productVariantName}</label>
                    <div className="product_Details_Price_Select_Div">
                      <select
                        className="product_Details_Price_Select"
                        onChange={handleSelectChange}
                      >
                        {products?.variants[0]?.productVariantValues.map(
                          (varientValue, index: number) => (
                            <option value={varientValue} key={index}>
                              {varientValue}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    {varientSize && (
                      <>
                        <label>{varientSize}</label>
                        <div className="product_Details_Price_Select_Div">
                          <select
                            className="product_Details_Price_Select"
                            onChange={handleSelectChange}
                          >
                            {productVarientValues[1]?.map(
                              (varientValue, index: number) => (
                                <option value={varientValue} key={index}>
                                  {varientValue}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </>
                    )}
                    <label>QUANTITY</label>
                    <input
                      className="product_Details_Quantity"
                      type="number"
                      value={quantity || undefined}
                      onChange={(e) => handleSetQuantity(e)}
                    />
                  </div>
                  <div className="h-full w-3/6 flex flex-col justify-end pb-3">
                    <Link
                      href="/cart"
                      onClick={addToCart}
                      className="product_Details_Button"
                    >
                      Add to Cart
                      <svg
                        viewBox="0 0 448 512"
                        fill="currentColor"
                        height="1.10em"
                        width="1.10em"
                        {...props}
                        className="pl-1"
                      >
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ) : (
                <Link className="product_Details_Login_Label" href="/login">
                  Login to see prices
                </Link>
              )}
            </div>
          </main>

          <div className="horizontal_Line"></div>

          <div className="description_Section">
            <label className="product_Details_Label" htmlFor="">
              Description
            </label>
            <div
              className="product_Details_Description list-disc"
              dangerouslySetInnerHTML={{
                __html: products?.productDescription,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
