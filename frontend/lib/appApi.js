import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logOut, setCredential } from './features/auth/accountSlice'
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().account.accessToken
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error?.originalStatus === 403) {
        const refreshResult = baseQuery('/refresh', api, extraOptions)
        if (refreshResult?.data) {
            const email = api.getState().account.email
            api.dispatch(setCredential({ ...refreshResult.data, email }))
            let result = await baseQuery(args, api, extraOptions)

        }
        else {
            api.dispatch(logOut())
        }
    }
    return result

}
export const appApi = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})