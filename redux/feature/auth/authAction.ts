import axiosInstance from "@/axiosIntersepter/axiosIntersepter";
import { ApiRoutes } from "@/components/models/common.enum";
import { CookieKeys } from "@/components/models/cookie.model";
import { IUser, UserRoles } from "@/components/models/user.model";
import { environment } from "@/service/env";
import { AsyncThunk, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { setCookie } from "nookies";

interface UserLoginRequest {
  email: string;
  password: string;
}

interface UserLoginResponse {
  accessToken: string;
  customerCode: string;
  storeName: string;
  userEmail: string;
  userId: string;
  userName: string;
  userRole: UserRoles;
}

type UserLoginThunk = AsyncThunk<any, any, any>;
// type UserLoginThunk = AsyncThunk<UserLoginResponse, UserLoginRequest, { rejectValue: string }>;

export const userLogin: UserLoginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }: UserLoginRequest, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response: AxiosResponse<UserLoginResponse> =
        await axiosInstance.post(
          `${environment.baseUrl}${ApiRoutes.AUTH}`,
          { email, password },
          config
        );

      const userData: IUser = {
        userRole: response.data.userRole,
        userId: response.data.userId,
        customerCode: response.data.customerCode,
        storeName: response.data.storeName,
        userEmail: response.data.userEmail,
        userName: response.data.userName,
      };

      setCookie(
        null,
        CookieKeys.USER_TOKEN,
        response.data.accessToken
      );
      setCookie(null, CookieKeys.USER_ROLE, response.data.userRole);
      setCookie(null, CookieKeys.USER_DETAIL, JSON.stringify(userData));

      return response.data;
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        }
        return rejectWithValue("An error occurred during the login request.");
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const logout = createAction("auth/logout");
