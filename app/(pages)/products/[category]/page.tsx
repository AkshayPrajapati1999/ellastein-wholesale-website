"use client";

import CardComponent from "@/components/ui/card";
import NewPagination from "@/components/ui/pagination";
import { paginate } from "@/utils/paginate";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useAppSelector } from "@/redux/hook";
import {
  getAllCategorys,
  getAllProducts,
} from "@/service/graphql/query/category.query";
import { gql, useQuery } from "@apollo/client";
import products from "../../../data/products.json";
import { graphQlMapper } from "@/service/graphql/graphql-mapper.service";
import { GraphQlKeyEnum } from "@/service/graphql/graphql-query.enum";
import { Product } from "@/components/models/product.model";
import { getAllProductById } from "@/service/graphql/query/productsCatAndSubCat.query";
import { IProductByIds } from "@/components/models/allProductDetails.model";
import Loading from "@/app/loading";

export default function ProductPage(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const categoryName = props.params.category;

  const product1 = graphQlMapper<any[]>(
    GraphQlKeyEnum.allCategories,
    getAllCategorys()
  );

  const categoryDetails: any = product1?.filter(
    (data) => data?.categoryName == categoryName
  );
  const categoryIds = categoryDetails[0]?.categoryId || undefined;

  const perticularCategoryDetails = graphQlMapper<IProductByIds[]>(
    GraphQlKeyEnum.products,
    getAllProductById(categoryIds, 0, 1, 1000)
  );

  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const { accessToken } = useAppSelector((state) => state.auth);
  // const { data, loading, error } = useQuery(getAllProducts(0, 0));

  const category = graphQlMapper<Product[]>(
    GraphQlKeyEnum.products,
    getAllProducts(0, 0)
  );
  // const paginatedPosts = paginate(category, currentPage, pageSize);
  const { loading, refetch } = useQuery(
    gql`
      ${getAllProductById(categoryIds, 0, 1, 1000)}
    `
  );
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <>
      <div className="custom_Container">
        {loading ? <Loading /> : null}
        <div className="custom_Inner_Container">
          <div className="sub_Navbar">
            <Link href="/" className="sub_Navbar_Link">
              HOME
            </Link>
            <Link href="" className="sub_Navbar_Link">
              BRACELETS
            </Link>
          </div>
          <div className="horizontal_Line"></div>
          <main className="sub_Main">
            <div className="my-7">
              <h1 className="text-2xl font-normal"> {categoryName}</h1>
              <p>{perticularCategoryDetails?.length} products</p>
            </div>
            <div className="button_Group">
              <button className="button">CHAIN BRACELETS</button>
              <button className="button">CUFF BRACELETS</button>
              <button className="button">BOLO BRACELETS</button>
              <button className="button">TENINIS BRACELETS</button>
              <button className="button">CUBAN BRACELETS</button>
            </div>
            <div className="filter_Div">
              <select className="filter_Div_Select">
                <option>SORT BY</option>
                <option>OLDEST TO NEWEST</option>
                <option>NEWEST TO OLDEST</option>
                <option>BEST SELLERS</option>
              </select>
            </div>
            <div className="mb-4">
              <NewPagination
                items={products.length}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={onPageChange}
              />
            </div>
            <div className="products_Container">
              {perticularCategoryDetails?.map((product: any, index: number) => (
                <CardComponent
                  key={index}
                  product={product}
                  isUserLoggedIn={accessToken}
                  category={product.category}
                  subcategory={product.subcategory}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
