/* eslint-disable @next/next/no-img-element */
"use client";
import { ResetPasswordQuery } from "@/service/graphql/query/signUp.query";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

const ResetPassword = () => {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const userId = searchParams.get("userid");
    setUserId(userId);
  }, []);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [urlId, setUserId] = useState<string | null>(null);
  const [resetPassword, { data, loading, error }] = useMutation(
    ResetPasswordQuery()
  );

  const handleResetPassword = () => {
    resetPassword({
      variables: {
        userId: urlId,
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      },
    })
      .then((data) => {
        console.log("daaata", data);
        window.location.href = "/login";
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <>
      <div className="flex justify-center flex-wrap mx-4 md:mx-20">
        <div className=" m-5 p-8 md:p-12 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="flex justify-center">
            <img
              src="https://res.cloudinary.com/dbrtm8pf6/image/upload/a_ignore,c_fit,h_100,q_80/v1707458898/uploads/c003d69e/profiles/1/footer_logos/antzo3qltlr859qvlxcn.png"
              className="h-8 px-9 content-center mb-6"
              alt="Ellastein Logo"
            />
          </div>
          <div className="flex justify-center">
            <h3 className="h-8 px-9 content-center mb-6">RESET PASSWORD</h3>
          </div>
          <label
            className="block text-gray-700 text-sm my-2"
            htmlFor="username"
          >
            OLD PASSWORD*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
            id="password"
            type="password"
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <label
            className="block text-gray-700 text-sm my-2"
            htmlFor="username"
          >
            NEW PASSWORD*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
            id="password"
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <label
            className="block text-gray-700 text-sm my-2"
            htmlFor="username"
          >
            CONFIRM PASSWORD*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
            id="password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            className="w-full bg-transparent my-2 text-black font-semibold py-2 px-4 border border-black rounded"
            onClick={handleResetPassword}
          >
            RESET PASSWORD
          </button>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
