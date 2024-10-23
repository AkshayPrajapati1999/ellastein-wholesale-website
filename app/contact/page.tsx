'use client'

import { useAppDispatch, useAppSelector, useAppStore } from "@/redux/hook";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
export default function Contact() {
const [product ,setProduct]=useState([])
// const fetchData = async()=>{
//   debugger
//   try {
//     const categories = await getCategories();
//     setProduct(categories as any);
//     console.log(categories);
//   } catch (error) {
//     console.error('Error fetching categories:', error.message);
//   }
// }
// useEffect(()=>{
//   fetchData();
// },[setProduct])
// const dispatch = useAppDispatch()
// const { products} = useAppSelector((state :any) => state.products);
// useEffect(() => {
//   dispatch(fetchProducts());
// }, []);
// console.log(products);


  return (
    <>
      <div className="custom_Container">
        <div className="custom_Inner_Container">
          <div className="sub_Navbar">
            <Link href="/" className="sub_Navbar_Link">
              HOME
            </Link>
            <label className="sub_Navbar_Current_Page">CONTACT US</label>
          </div>
          <div className="horizontal_Line"></div>
          <h1 className="contact_Title">CONTACT US</h1>
          <main className="contact_Main">
            <div className="lg:w-6/12 md:w-6/12 ">
              <label className="contact_Label">NAME*</label>
              <input className="contact_Input_Field" id="name" type="text" />
              <label className="contact_Label">EMAIL*</label>
              <input
                className="contact_Input_Field"
                id="email"
                type="message"
              />
              <label className="contact_Label">MESSAGE*</label>
              <textarea id="editor" rows={8} className="contact_Input_Field" />
              <button className="contact_Button">SEND MESSAGE</button>
            </div>
            <div className="contact_Location_Div">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 ml-2"
                >
                  <path
                    fillRule="evenodd"
                    d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                    clipRule="evenodd"
                  />
                </svg>
                <label className="contact_Addres">Address</label>
              </div>
              <label className="contact_Country">India</label>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
