import {createAsyncThunk} from "@reduxjs/toolkit";
import api, {apiError, apiUrl} from "../../api";
import {IFilter, ISeeds} from "../../models/ISeeds";
import {AxiosError} from "axios";

export const getCrops = createAsyncThunk(
    'getCrops',
    async (_, thunkAPI) => {
        try {
            const {data} = await api.get<IFilter[]>(apiUrl + 'crops/')
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(apiError(e as Error | AxiosError))
        }
    }
)

export const getTypeSeeds = createAsyncThunk(
    'getTypeSeeds',
    async (_, thunkAPI) => {
        try {
            const {data} = await api.get<IFilter[]>(apiUrl + 'type_seeds/')
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(apiError(e as Error | AxiosError))
        }
    }
)

export const getHybrid = createAsyncThunk(
    'getHybrid',
    async (_, thunkAPI) => {
        try {
            const {data} = await api.get<IFilter[]>(apiUrl + 'hybrid/')
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(apiError(e as Error | AxiosError))
        }
    }
)

export const getProvider = createAsyncThunk(
    'getProvider',
    async (_, thunkAPI) => {
        try {
            const {data} = await api.get<IFilter[]>(apiUrl + 'provider/')
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(apiError(e as Error | AxiosError))
        }
    }
)

export const getCountryOrigin = createAsyncThunk(
    'getCountryOrigin',
    async (_, thunkAPI) => {
        try {
            const {data} = await api.get<IFilter[]>(apiUrl + 'country_origin/')
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(apiError(e as Error | AxiosError))
        }
    }
)

export const getSeeds = createAsyncThunk(
    'getSeeds',
    async (_, thunkAPI) => {
        try {
            const {data} = await api.get<ISeeds[]>(apiUrl + 'seeds/')
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(apiError(e as Error | AxiosError))
        }
    }
)

export const getIncoming = createAsyncThunk(
    'getIncoming',
    async (query: any, thunkAPI) => {
        try {
            const {data} = await api.get<any>(apiUrl + 'incoming/', {params: query})
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(apiError(e as Error | AxiosError))
        }
    }
)
