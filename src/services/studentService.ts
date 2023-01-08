//======== HINT =======
// THIS FILE WILL BE USED IF I INTEGRATED WITH BACKEND APIS
// I'M USING RTK QUERY HERE AS A PART OF REDUX TOOLKIT

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_KEY, BASE_URL } from '@utils/constants';
import { INew } from 'types';

export const newsService = createApi({
  reducerPath: 'newsService',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: headers => {
      headers.set('Authorization', `Bearer ${API_KEY}`);
      return headers;
    },
  }),
  endpoints: builder => ({
    getNews: builder.mutation<{ articles: INew[] }, string>({
      query: searchKey => ({
        url: `top-headlines?${
          searchKey ? `q=${searchKey}&` : ''
        }country=us&pageSize=50`,
        method: 'GET',
      }),
    }),
  }),
});

export const stringifyError = (error: any) => error.data.message;
export const { useGetNewsMutation } = newsService;
