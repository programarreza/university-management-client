import { baseApi } from "../../api/baseApi";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: object;
  token: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});



// export const { useLoginMutation } = authApi;