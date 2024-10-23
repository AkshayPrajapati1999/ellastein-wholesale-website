import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logout, userLogin } from "./authAction";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { CookieKeys } from "@/components/models/cookie.model";

interface UserInfo {
  accessToken: string;
  userRole: string;
}

interface AuthState {
  loading: boolean;
  accessToken: string | null;
  userRole: string | null;
  error: Error | null;
  success: boolean;
  isLogged: boolean;
}

const cookies = parseCookies();
const accessToken = cookies[CookieKeys.USER_TOKEN];
const userRole = cookies[CookieKeys.USER_ROLE];
const initialState: AuthState = {
  loading: false,
  accessToken: accessToken || null,
  error: null,
  success: false,
  isLogged: !!accessToken,
  userRole: userRole || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isLogged = false;
      })
      .addCase(
        userLogin.fulfilled,
        (state, { payload }: PayloadAction<UserInfo>) => {
          state.loading = false;

          state.isLogged = true;
          state.accessToken = payload.accessToken;
          state.userRole = payload.userRole;

        }
      )
      .addCase(userLogin.rejected, (state) => {
        state.loading = false;
        state.isLogged = false;
      })
      .addCase(logout, (state) => {
        state.loading = false;
        state.accessToken = null;
        destroyCookie(null, CookieKeys.USER_DETAIL);
        state.error = null;
        state.success = false;
        state.isLogged = false;
      });
  },
});

export default authSlice.reducer;
