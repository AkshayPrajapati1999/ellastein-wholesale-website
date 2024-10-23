"use client";

import CardComponent from "@/components/ui/card";
import NewPagination from "@/components/ui/pagination";
import { paginate } from "@/utils/paginate";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useAppSelector } from "@/redux/hook";
import products from "../../../../data/products.json";

import Loading from "@/app/loading";
import { IProductByIds } from "@/components/models/allProductDetails.model";
import { ISubCategory } from "@/components/models/category.model";
import { Product } from "@/components/models/product.model";
import { graphQlMapper } from "@/service/graphql/graphql-mapper.service";
import { GraphQlKeyEnum } from "@/service/graphql/graphql-query.enum";
import {
  getAllCategory,
  getAllCategorys,
  getAllProducts,
  getSubCategoryByCategoryId,
} from "@/service/graphql/query/category.query";
import { getAllProductById } from "@/service/graphql/query/productsCatAndSubCat.query";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

export default function SubCategoryPage(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const params: any = useParams<{ tag: string; item: string }>();

  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const paginatedPosts = paginate(products, currentPage, pageSize);
  const { accessToken } = useAppSelector((state) => state.auth);
  // const {
  //   data,
  //   loading: productsLoading,
  //   error,
  // } = useQuery(
  //   gql`
  //     ${getAllProducts(0, 0)}
  //   `
  // );

  const category = graphQlMapper<Product[]>(
    GraphQlKeyEnum.products,
    getAllProducts(0, 0)
  );

  function remove_numbers_and_symbols(text) {
    let new_text = "";
    for (let char of text) {
      if (char.match(/[a-zA-Z]/)) {
        new_text += char;
      }
    }
    return new_text;
  }

  const product1 = graphQlMapper<any[]>(
    GraphQlKeyEnum.allCategories,
    getAllCategorys()
  );

  const subCategoryList = graphQlMapper<any[]>(
    GraphQlKeyEnum.allCategoriesWithSubCategories,
    getAllCategory()
  );

  const subCategory = params.subcategory.replace(/%20/g, " ");

  const categoryName = params.category.replace(/[%\d]/g, "");

  const categoryDetails: any | undefined = product1?.filter(
    (categoryData: any | undefined) =>
      categoryData?.categoryName.toLowerCase() === categoryName
  );

  const subCategoryDetails: any | undefined = subCategoryList
    ?.filter(
      (categoryData: any | undefined) =>
        categoryData?.categoryName.toLowerCase() === categoryName
    )
    .map((item) =>
      item.subCategories.map((subItem) => subItem.subCategoryName)
    );
  const newsubCategoryDetails = subCategoryDetails?.length
    ? subCategoryDetails![0]
    : "";

  const categoryIds = categoryDetails?.map((item) => item.categoryId);

  const perticularsubCategoryDetails = graphQlMapper<ISubCategory[]>(
    GraphQlKeyEnum.subCategoryByCategoryId,
    getSubCategoryByCategoryId(categoryIds)
  );

  const subcategoryDetails: any | undefined =
    perticularsubCategoryDetails?.filter(
      (subcategoryData: any | undefined) =>
        subcategoryData?.subCategoryName.toLowerCase() === subCategory
    );

  const subcategoryIds = subcategoryDetails?.map((item) => item.subCategoryId);

  const SubCategoryName = remove_numbers_and_symbols(params.subcategory);

  const perticularCategoryDetails = graphQlMapper<IProductByIds[]>(
    GraphQlKeyEnum.products,
    getAllProductById(categoryIds, subcategoryIds, 1, 1000)
  );

  const { loading, refetch } = useQuery(
    gql`
      ${getAllProductById(categoryIds, subcategoryIds, 1, 1000)}
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
            <Link href="" className="sub_Navbar_Link uppercase">
              {params.category}
            </Link>
            <p className="sub_Navbar_Link uppercase">{SubCategoryName}</p>
          </div>
          <div className="horizontal_Line"></div>

          <main className="px-11">
            <div className="my-7">
              <h1 className="text-2xl font-normal uppercase">
                {SubCategoryName}
              </h1>
              <p>{perticularCategoryDetails?.length} products</p>
            </div>
            <div className="button_Group">
              {newsubCategoryDetails?.map((item: any, index: number) => {
                return (
                  <>
                    <Link
                      key={index}
                      className="button no-underline"
                      href={`/products/${params.category.toLowerCase()}/${item.toLowerCase()}`}
                    >
                      {item}
                    </Link>
                  </>
                );
              })}
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
