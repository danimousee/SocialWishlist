import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
//import Platos from '../../../../productos/platos'

export const platosApi = createApi({
    reducerPath:"platosApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'Platos',
    }),
    endpoints: (builder) => ({
        getAllPlatos: builder.query({
            query: () => "/Carta/Platos"
        })
    })
})

export const { useGetAllPlatosQuery } = platosApi

