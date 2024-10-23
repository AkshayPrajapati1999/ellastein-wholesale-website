/* eslint-disable @next/next/no-img-element */
"use client";

import { userLogin } from "@/redux/feature/auth/authAction";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Login() {
  const router =useRouter()
  const dispatch = useAppDispatch()
  const handleSubmit = (event) => {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    let data :any = Object.fromEntries(formData.entries());
    dispatch(userLogin(data))
    .then(() => {
      router.push('/home')
    })
    .catch((error: any) => {
      console.log(error);
    });
  };  
  
  return (
    <>
      <div className="flex justify-center flex-wrap lg:py-12 md:py-12 sm:py-4 py-4 bg-[#f5f7fa]">
        <div className=" m-5 p-8 md:p-12 shadow-xl bg-white">
          <div className="flex justify-center">
            <img
              src="https://res.cloudinary.com/dbrtm8pf6/image/upload/a_ignore,c_fit,h_100,q_80/v1707458898/uploads/c003d69e/profiles/1/footer_logos/antzo3qltlr859qvlxcn.png"
              className="h-8 px-9 content-center mb-6"
              alt="Ellastein Logo"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <label className="login_Labless">EMAIL*</label>
            <input
              className="login_Input"
              id="email"
              type="text"
              name="email"
            />
            <label className="login_Labless">PASSWORD*</label>
            <input
              className="login_Input"
              id="password"
              name="password"
              type="password"
            />
            <label className="login_CheackBox_Div">
              <input className="mr-2 leading-tight" type="checkbox" />
              <span className="text-sm "> Remember me</span>
            </label>
            <button type="submit" className="login_Button">
              LOG IN
            </button>
          </form>
          <Link href="/resetpassword" className="forgot_Button">
            RESET PASSWORD?
          </Link>
          <div className="horizontal_Line"></div>

          <div className="one_Time_Login">
            <label> OR SEND ME A</label> <br />
            <Link href="" className=" no-underline ">
              ONE-TIME LOGIN LINK
            </Link>
          </div>
          <button className="sign_UP_Button">SIGN UP</button>
          <div className="my-2 text-sm">
            <Link href="" className=" no-underline">
              Administrator Login
            </Link>
            <br />
            <Link href="" className=" no-underline">
              Sales Rep Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
