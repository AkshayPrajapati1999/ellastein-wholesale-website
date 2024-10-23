import React from "react";

const Signin = () => {
  return (
    <>


      <div className=" m-auto mt-9 lg:max-w-4xl md:max-w-xl sm:max-w-sm max-w-xs w-full mb-20 ">
        <div className=" bg-black text-white p-10 pb-7 ">
          <h1 className="lg:text-2xl md:text-xl pb-2">SIGN UP</h1>
          <div className="flex">
            <p>Already got an account?</p>
            <a href="#" className=" font-bold pl-1">
              Sign in
            </a>
          </div>
        </div>
        <div className="flex justify-center pt-7 lg:gap-6 md:p-10 md:gap-6 shadow-lg pb-7 lg:flex-row md:flex-row flex-col  p-10">
          <form action="">
            <div className="flex-row">
              <div className="">
                <div className="mb-4">
                  <label className="block text-xs text-gray-500  font-bold mb-2 pb-2">
                    COMPANY NAME *
                  </label>
                  <input
                    className=" focus:ring-4 focus:ring-blue-300 border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-xs text-gray-500 font-bold mb-2 pb-2">
                    FULL NAME *
                  </label>
                  <input
                    className="focus:ring-4 focus:ring-blue-300 border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-xs text-gray-500 font-bold mb-2 pb-2">
                    PHONE
                  </label>
                  <input
                    className="focus:ring-4 focus:ring-blue-300 border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-xs text-gray-500 font-bold pb-2">
                    ACTIVITY
                  </label>
                  <select
                    id="countries"
                    className="focus:ring-4 focus:ring-blue-300 border-2  text-sm rounded-lg block w-full p-2.5  "
                  >
                    <option selected>Please select...</option>
                    <option value="1">Retailer</option>
                    <option value="2">Canada</option>
                    <option value="3">France</option>
                  </select>
                </div>
              </div>
            </div>
          </form>

          <form action=""></form>
          <div>
            <div className="mb-4">
              <label className="block text-xs text-gray-500 font-bold mb-2 pb-2">
                ADDRESS
              </label>
              <input
                className="focus:ring-4 focus:ring-blue-300 border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs text-gray-500 font-bold mb-2 pb-2">
                ADDRESS LINE 2
              </label>
              <input
                className="focus:ring-4 focus:ring-blue-300 border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs text-gray-500 font-bold mb-2 pb-2">
                CITY
              </label>
              <input
                className="focus:ring-4 focus:ring-blue-300 border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-xs text-gray-500 font-bold pb-2">
                COUNTRY
              </label>
              <select
                id="countries"
                className="focus:ring-4 focus:ring-blue-300 border-2  text-sm rounded-lg block w-full p-2.5  "
              >
                <option selected>Please select...</option>
                <option value="1">Retailer</option>
                <option value="2">Canada</option>
                <option value="3">France</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-xs text-gray-500 font-bold mb-2 pb-2">
                POSTAL CODE
              </label>
              <input
                className="focus:ring-4 focus:ring-blue-300 border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="number"
              />
            </div>
          </div>
          <div></div>
          <div className="flex">
            <form action="">
              <div className="mb-4">
                <label className="block text-xs text-gray-500 font-bold mb-2 pb-2">
                  EMAIL *
                </label>
                <input
                  className="focus:ring-4 focus:ring-blue-300 border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                />
              </div>
              <div className="mb-4">
                <label className="block text-xs text-gray-500 font-bold mb-2 pb-2">
                  PASSWORD *
                </label>
                <input
                  className="focus:ring-4 focus:ring-blue-300 border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                />
              </div>
              <div className="mb-4">
                <label className="block text-xs text-gray-500 font-bold mb-2 pb-2">
                  PASSWORD CONFIRMATION *
                </label>
                <input
                  className="focus:ring-4 focus:ring-blue-300 border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                />
              </div>
              <div>
                <button className="w-full align-middle bg-transparent text-black font-semibold py-2 px-4 border border-black rounded my-2 transition duration-300 ease-in-out hover:bg-black hover:text-white hover:border-transparent">
                  SIGN UP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
