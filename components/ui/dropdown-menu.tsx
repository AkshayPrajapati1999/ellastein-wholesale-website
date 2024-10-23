"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ISubCategory } from "../models/category.model";

export interface SharedDropdownProps {
  label: string;
  options: ISubCategory[];
}

const DropdownItem = ({ category, label, option, closeDropdown }) => (
  <Link
    href={`/products/${category.toLowerCase()}/${option.toLowerCase()}`}
    className="no-underline p-6"
    onClick={closeDropdown}
  >
    {label}
  </Link>
);

const SharedDropdown = ({ label, options }: SharedDropdownProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<any>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleOutsideClick = (e: { target: any }) => {
    if (dropdownRef?.current && !dropdownRef.current?.contains(e.target)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isDropdownOpen]);
  return (
    <div className="relative" ref={dropdownRef}>
      <span className="Custom_navlink" onClick={toggleDropdown}>
        {label}
      </span>
      {isDropdownOpen && (
        <div className="flex flex-col absolute bg-white w-56 top-11 ">
          {options.map((option: ISubCategory, index: number) => (
            <DropdownItem
              key={index}
              option={option.subCategoryName}
              category={label}
              label={option.subCategoryName}
              closeDropdown={closeDropdown}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SharedDropdown;
