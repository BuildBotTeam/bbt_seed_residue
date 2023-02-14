import {AnyAction, createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import {checkToken, login, logout} from "../actions/auth";
import api, {IApiError} from "../../api";


interface IAuthState {
    token: string | null
    isLoading: boolean
    error: IApiError | null
    interceptor: number
    isAuth: boolean
    authState: boolean
}

const initialState: IAuthState = {
    token: null,
    isLoading: false,
    error: null,
    interceptor: 0,
    isAuth: false,
    authState: true
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        rejectRemoteAuth(state, {payload}) {
            state.token = null
            state.interceptor = 0
            state.isLoading = false
            state.authState = false
            state.error = payload?.error || null
            state.isAuth = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, {payload}) => {
            state.token = payload.token
            state.interceptor = payload.interceptor
            state.isLoading = false
            state.error = null
            state.isAuth = true
        })
        builder.addCase(checkToken.pending, (state) => {
            state.authState = true
        })
        builder.addCase(checkToken.fulfilled, (state, {payload}) => {
            state.token = payload?.token || null
            state.interceptor = payload?.interceptor || 0
            state.isLoading = false
            state.authState = false
            state.error = null
            state.isAuth = true
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.token = null
            state.isLoading = false
            state.error = null
            state.isAuth = false
            state.authState = false
        })

        builder.addMatcher(isFulfilled, (state) => {
            state.isLoading = false
            state.error = null
        })
        builder.addMatcher(isPending, (state) => {
            state.isLoading = true
        })
        builder.addMatcher(isRejected, (state, action: AnyAction) => {
            if (action.payload?.code === 401) {
                localStorage.removeItem('token')
                api.interceptors.request.eject(state.interceptor)
                state.token = null
                state.isAuth = false
            }
            state.authState = false
            state.isLoading = false
            state.error = action.payload
        })
    }
})

export const {rejectRemoteAuth} = authSlice.actions
export default authSlice.reducer
