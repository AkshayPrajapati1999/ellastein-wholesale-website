/* eslint-disable @next/next/no-img-element */
"use client";
import Loading from "@/app/loading";
import { logout } from "@/redux/feature/auth/authAction";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import EmitterService, {
  EventEmitterEvents,
} from "@/service/event-emitter.service";
import { graphQlMapper } from "@/service/graphql/graphql-mapper.service";
import { GraphQlKeyEnum } from "@/service/graphql/graphql-query.enum";
import { getAllCategory } from "@/service/graphql/query/category.query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowRight, FaCaretDown } from "react-icons/fa";
import { GoTriangleDown } from "react-icons/go";
import { IoMdNotifications } from "react-icons/io";
import { IoTime } from "react-icons/io5";
import { RiAccountCircleFill } from "react-icons/ri";
import { ICategory } from "../models/category.model";
import { CookieKeys, getCookie, setCookies } from "../models/cookie.model";
import { UserRoles, isUserLoggedIn } from "../models/user.model";
import CartAmountTotal from "../shared/CartAmountTotal";
import UserSalesAgentDropDownList from "../shared/UserSalesAgentDropDownList";
import Button from "../ui/button";
import SharedDropdown from "../ui/dropdown-menu";

interface PageProps {
  onRegisterClick: () => void;
}

const Header: React.FC<PageProps> = ({ onRegisterClick }) => {
  const [selectedOption, setSelectedOption] = useState<string>(
    getCookie(CookieKeys.SELECTED_RETAILER)
  );
  const useDispatch = useAppDispatch();
  const { userRole } = useAppSelector((state) => state.auth);

  const [account, setAccount] = useState(false);
  const router = useRouter();
  const handleAccountClick = () => {
    setAccount(!account);
  };

  const HandleLogout = () => {
    router.push("/home");
    useDispatch(logout());
  };

  const categories = graphQlMapper<ICategory[]>(
    GraphQlKeyEnum.allCategoriesWithSubCategories,
    getAllCategory()
  );

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setCookies(CookieKeys.SELECTED_RETAILER, selectedValue);
    EmitterService.emit(EventEmitterEvents.OnRetailerChange, true);
    setSelectedOption(selectedValue);
  };

  return (
    <>
      <div className="header_Top max-w-7xl p-4">
        <Link href="/home" className="max-w-48">
          <img
            src="https://res.cloudinary.com/dbrtm8pf6/image/upload/a_ignore,c_fit,h_100,q_80/v1707458898/uploads/c003d69e/profiles/1/footer_logos/antzo3qltlr859qvlxcn.png"
            className="h-5"
            alt="Ellastein Logo"
          />
        </Link>
        <div className="header_Top_Sub" id="navbar-default">
          {isUserLoggedIn() ? (
            <>
              <div className="flex gap-5">
                <div className="flex">
                  <Link href="/order" className="header_Link">
                    <IoTime className="mr-2 text-xl " />
                    <span className="header_Label ">ORDER HISTRY</span>
                  </Link>
                  {(userRole === UserRoles.ADMIN ||
                    userRole === UserRoles.SALES_AGENT) && (
                    <div className="header_Label">
                      <div className={!selectedOption ? "agentList" : ""}>
                        {
                          <UserSalesAgentDropDownList
                            onHandleSelectChange={handleSelectChange}
                            selectOption={selectedOption}
                          />
                        }
                      </div>
                    </div>
                  )}
                  <div
                    onClick={handleAccountClick}
                    className="header_Account_Section group relative"
                  >
                    <RiAccountCircleFill className="mr-2 text-xl" />
                    <span className="header_Account_Label group-hover:text-black transition-colors">
                      ACCOUNT <GoTriangleDown />
                    </span>
                    {account && (
                      <div className="header_Account_Box absolute">
                        <div className="pb-4 font-bold">MY ACCOUNT</div>
                        <div className="horizontal_Line mb-4"></div>
                        <div className="pb-4">USER</div>
                        <div className="horizontal_Line mb-4"></div>
                        <button
                          type="button"
                          className="header_Account_LogOut"
                          onClick={() => HandleLogout()}
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <div className="header_Bell_Icon">
                      <IoMdNotifications className="text-2xl items-center " />
                    </div>
                    <span className="header_Notification_Count">0</span>
                    <Link
                      href="/cart"
                      className="header_ordered_Summary no-underline"
                    >
                      <div className="flex flex-col ml-2.5 mr-12">
                        <div>
                          <span className="header_ordered_Total_Label">
                            ORDER TOTAL
                          </span>
                        </div>
                        <div>
                          {isUserLoggedIn() && selectedOption && (
                            <CartAmountTotal retailUserId={selectedOption} />
                          )}
                        </div>
                      </div>
                      <div className="header_ordered_Total_Button">
                        <FaArrowRight className="" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <ul className="header_LogIn_SignUp">
              <li>
                <Button
                  onClick={() => router.push("/login")}
                  variant="secondary"
                >
                  Login
                </Button>
              </li>
              <li>
                <Link href="/register">
                  <Button variant="primary" onClick={onRegisterClick}>
                    Registers
                  </Button>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className="horizontal_Line"></div>

      <div className="header_Top w-full p-0">
        <ul className="header_NavBar">
          <li className="header_NavBar_Link">
            <span>
              <Link href="/" className="Custom_navlink">
                Home
              </Link>
            </span>
          </li>
          {!categories ? (
            <li className="ml-0 ">
              <Loading />
            </li>
          ) : (
            <>
              {categories &&
                categories.map((item) => (
                  <li key={item.categoryId} className="header_NavBar_Link">
                    <>
                      <SharedDropdown
                        label={item.categoryName}
                        options={item.subCategories}
                      />
                      <FaCaretDown className="ml-1 text-shade-0 " />
                    </>
                  </li>
                ))}
            </>
          )}

          <li className="header_NavBar_Link">
            <span>
              <Link href="/contact" className="Custom_navlink">
                Contact Us
              </Link>
            </span>
          </li>
        </ul>
        <form className="max-w-md">
          <div className="relative flex items-center">
            <input
              type="search"
              id="default-search"
              className="header_Search_Box"
              placeholder="Search"
              required
            />
            <label htmlFor="default-search" className="header_Search_Box_Label">
              <svg
                className="header_Search_Icon"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </label>
            <label htmlFor="default-search" className="header_Search_Label">
              Search
            </label>
          </div>
        </form>
      </div>

      <div className="horizontal_Line"></div>
    </>
  );
};

export default Header;
