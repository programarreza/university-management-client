import { TAdmin, TQueryParam, TResponseRedux, TStudent } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),

    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    addAdmin: builder.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        body: data,
      }),
    }),

    getAllAdmins: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/admins",
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<TAdmin[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    addFaculty: builder.mutation({
      query: (data) => ({
        url: "/users/create-faculty",
        method: "POST",
        body: data,
      }),
    }),

    getAllFaculties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/faculties",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddStudentMutation,
  useGetAllStudentsQuery,
  useAddAdminMutation,
  useGetAllAdminsQuery,
  useAddFacultyMutation,
  useGetAllFacultiesQuery,
  useChangePasswordMutation,
} = userManagementApi;
