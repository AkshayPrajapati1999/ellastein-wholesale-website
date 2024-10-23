import Link from "next/link";
import React from "react";
import { Product } from "../models/product.model";

const CardComponent: React.FC<{
  product: Product;
  isUserLoggedIn: string | null;
  subcategory: string;
  category: string;
}> = ({ product, isUserLoggedIn, subcategory, category }) => {
  const {
    img,
    id,
    title,
    productPrice,
    variantWholesalePrice,
    productName,
    productImage,
    productId,
  } = product;

  return (
    <div key={id} className="card_Main">
      <Link href={`/products/${productName}/view/${productId}`}>
        <img className="" src={productImage} alt="" />
      </Link>
      <div className="card_Details_div">
        {isUserLoggedIn ? (
          <>
            <div className="flex flex-col items-start">
              <Link
                className="font-bold red no-underline text-left"
                href={`/products/${productName}/view/${productId}`}
              >
                MSRP ${productPrice}.00 <br />
                Wholesale Price <label>${variantWholesalePrice}.00</label>
              </Link>
              <Link
                className="card_Product_Name"
                href={`/products/${productName}/view/${productId}`}
              >
                {productName}
              </Link>
            </div>
          </>
        ) : (
          <>
            <a className="card_Product_Price" href="/login">
              Login to see prices
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default CardComponent;
