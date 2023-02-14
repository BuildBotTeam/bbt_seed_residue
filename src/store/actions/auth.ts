import axios, {AxiosError} from "axios";
import {IAuth, IAuthResponse} from "../../models/IAuth";
import {apiUrl, restAuthUrl} from "../../api";
import {createAsyncThunk} from "@reduxjs/toolkit";
import api, {apiError} from "../../api";

let interceptor = 0;

export const login = createAsyncThunk(
    'login',
    async (post: IAuth, thunkAPI) => {
        try {
            const {data} = await axios.post<IAuthResponse>(restAuthUrl + 'login/', post)
            localStorage.setItem('token', data.key)
            interceptor = api.interceptors.request.use((config: any) => {
                config.headers["Authorization"] = `Token ${data.key}`;
                return config
            })
            return {token: data.key, interceptor: interceptor}
        } catch (e: any) {
            return thunkAPI.rejectWithValue({code: 0, message: e.message})
        }
    }
)

export const logout = createAsyncThunk(
    'logout',
    async (_, thunkAPI) => {
        localStorage.removeItem('token');
        try {
            await api.post(restAuthUrl + "logout/", {})
            api.interceptors.request.eject(interceptor)
            return {}
        } catch (e) {
            api.interceptors.request.eject(interceptor)
            return thunkAPI.rejectWithValue(apiError(e as Error | AxiosError))
        }
    }
)

export const checkToken = createAsyncThunk(
    'checkToken',
    async (token: string | null, thunkAPI) => {
        if (!token) token = localStorage.getItem('token');
        if (token) {
            try {
                await axios.post<IAuthResponse>(apiUrl + 'check_token/', {token: token})
                interceptor = api.interceptors.request.use((config: any) => {
                    config.headers["Authorization"] = `Token ${token}`;
                    return config
                })
                localStorage.setItem('token', token)
                return {token: token, interceptor: interceptor}
            } catch (e) {
                thunkAPI.dispatch(logout());
                return thunkAPI.rejectWithValue(apiError(e as Error | AxiosError))
            }
        } else if (token === undefined) {
            console.log(token)
            thunkAPI.dispatch(logout());
            return thunkAPI.rejectWithValue({code: 0, message: 'В системе обнаружен устаревший токен'})
        }
        return thunkAPI.rejectWithValue({})
    }
)
