import Link from "next/link";
import React from "react";

const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(items / pageSize);

  if (pagesCount === 1) return null;

  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <nav aria-label="Page navigation">
      <ul className="flex items-center -space-x-px h-10 text-base">
        <li>
          <Link
            href="#"
            className="pagination_Left"
            onClick={() => onPageChange(currentPage - 1)}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </Link>
        </li>

        {pages.map((page) => (
          <li key={page}>
            <Link
              href=""
              className={
                page === currentPage
                  ? "pagination_Button_Active"
                  : "pagination_Button_Inactive"
              }
              onClick={() => onPageChange(page)}
            >
              {page}
            </Link>
          </li>
        ))}

        <li>
          <Link
            href=""
            className="pagination_Right"
            onClick={() => onPageChange(currentPage + 1)}
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
