"use client";

import CardComponent from "@/components/ui/card";
import NewPagination from "@/components/ui/pagination";
import { paginate } from "@/utils/paginate";
import Link from "next/link";
import { useState } from "react";

import { useAppSelector } from "@/redux/hook";
import { getAllProductsList } from "@/service/graphql/query/category.query";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params: any = useParams<{ tag: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const { data, loading, error } = useQuery(
    gql`
      ${getAllProductsList(0, 0)}
    `
  );
  const category = data?.products.graphdata;
  const { accessToken } = useAppSelector((state) => state.auth);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error fetching data</p>;
  }

  const paginatedPosts = paginate(category, currentPage, pageSize);
  return (
    <>
      <div className="custom_Container">
        <div className="custom_Inner_Container">
          <div className="sub_Navbar">
            <Link href="/" className="sub_Navbar_Link">
              HOME
            </Link>
            <span className="sub_Navbar_Link uppercase">All Products</span>
          </div>
          <div className="horizontal_Line"></div>
          <main className="sub_Main">
            <div className="my-7">
              <h1 className="text-2xl font-normal uppercase">All Products</h1>
            </div>

            <div className="mb-4">
              <NewPagination
                items={category.totalPages * 40}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={onPageChange}
              />
            </div>
            <div className="products_Container">
              {category?.map((product: any, index: number) => (
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
