/* eslint-disable @next/next/no-img-element */
"use client";
import { Product } from "@/components/models/product.model";
import CardComponent from "@/components/ui/card";
import { useAppSelector } from "@/redux/hook";
import { graphQlMapper } from "@/service/graphql/graphql-mapper.service";
import { GraphQlKeyEnum } from "@/service/graphql/graphql-query.enum";
import {
  getAllCategorys,
  getAllProducts,
} from "@/service/graphql/query/category.query";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import Loading from "../loading";
import { GetCartAmount } from "@/service/graphql/query/cart.query";

function Home() {
  const product1 = graphQlMapper<Product[]>(
    GraphQlKeyEnum.allCategories,
    getAllCategorys()
  );

  const { data, loading, error } = useQuery(
    gql`
      ${getAllProducts(0, 0)}
    `
  );

  

  const category = graphQlMapper<Product[]>(
    GraphQlKeyEnum.products,
    getAllProducts(0, 0)
  );

  const { accessToken } = useAppSelector((state) => state.auth);

  return (
    <div className="home_Main_Container">
      <div className="home_Sub_Main_Container">
        <div className="home_Header_Container">
          <div className="home_Image">
            <img
              className="w-full h-auto"
              src="https://res.cloudinary.com/dbrtm8pf6/image/upload/a_ignore,c_fill,f_auto,g_center,q_auto,w_2500/v1705948828/uploads/c003d69e/banners/4/images/Wholesale_Website_Banner-logo_1705948830.jpg"
              alt=""
            />
          </div>
          <section className="top_Product_Section">
            {product1?.map((product: any) => (
              <div key={product.categoryId} className="top_Product_Card">
                <img className="top_Product_Image" src={product.img} alt="" />
                <div className="top_Product_Title_Box">
                  <Link
                    className="top_Product_Title"
                    href={`products/${product.categoryName}`}
                  >
                    {product.categoryName}
                  </Link>
                </div>
              </div>
            ))}
          </section>
        </div>

        <div className="home_horizontalLine"></div>

        <div className="home_main-div">
          <section className="latest_Product">
            <span className="text-[29px]">Latest Product</span>
            <Link className="latest_Product_Link group" href={`allproducts`}>
              SEE MORE
              <svg
                fill="currentColor"
                viewBox="0 0 16 16"
                className=" w-[2.25rem] text-gray-500 group-hover:text-black"
              >
                <path
                  fillRule="evenodd"
                  d="M4 8a.5.5 0 01.5-.5h5.793L8.146 5.354a.5.5 0 11.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.293 8.5H4.5A.5.5 0 014 8z"
                />
              </svg>
            </Link>
          </section>
        </div>

        <div className="bottom_Product_Section">
          {loading ? (
            <Loading />
          ) : (
            <section className="products_Container">
              {category?.slice(0, 4).map((product: any, index: number) => (
                <CardComponent
                  key={index}
                  product={product}
                  isUserLoggedIn={accessToken}
                  category={product.category}
                  subcategory={product.subcategory}
                />
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
