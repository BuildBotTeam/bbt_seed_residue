import {createAsyncThunk} from "@reduxjs/toolkit";
import api, {apiError, apiUrl} from "../../api";
import {IExpense, IFilter, IIncoming, IIncomingExpense, ISeeds} from "../../models/ISeeds";
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

export const getGreenhouse = createAsyncThunk(
    'getGreenhouse',
    async (_, thunkAPI) => {
        try {
            const {data} = await api.get<IFilter[]>(apiUrl + 'greenhouse/')
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

export const getUnits = createAsyncThunk(
    'getUnits',
    async (_, thunkAPI) => {
        try {
            const {data} = await api.get<IFilter[]>(apiUrl + 'units/')
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
            let url = 'incoming/'
            if (query.id) url += `${query.id}/`
            const {data} = await api.get<IIncoming | IIncoming[]>(apiUrl + url, {params: query})
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(apiError(e as Error | AxiosError))
        }
    }
)

export const createIncoming = createAsyncThunk(
    'createIncoming',
    async (post: IIncoming, thunkAPI) => {
        try {
            const {data} = await api.post<IIncoming>(apiUrl + 'incoming/', post)
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(apiError(e as Error | AxiosError))
        }
    }
)

export const updateIncoming = createAsyncThunk(
    'updateIncoming',
    async (post: IIncoming, thunkAPI) => {
        try {
            const {data} = await api.put<IIncoming>(apiUrl + `incoming/${post.id}/`, post)
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(apiError(e as Error | AxiosError))
        }
    }
)

export const deleteIncoming = createAsyncThunk(
    'deleteIncoming',
    async (query: number, thunkAPI) => {
        try {
            await api.delete<IIncoming>(apiUrl + `incoming/${query}/`,)
            return query
        } catch (e) {
            return thunkAPI.rejectWithValue(apiError(e as Error | AxiosError))
        }
    }
)

export const getExpense = createAsyncThunk(
    'getExpense',
    async (query: any, thunkAPI) => {
        try {
            const {data} = await api.get<IExpense[]>(apiUrl + 'expense/', {params: query})
            const newData: IIncomingExpense = {[query.incoming]: data}
            return newData
        } catch (e) {
            return thunkAPI.rejectWithValue(apiError(e as Error | AxiosError))
        }
    }
)

export const createExpense = createAsyncThunk(
    'createExpense',
    async (post: IExpense, thunkAPI) => {
        try {
            const {data} = await api.post<IExpense>(apiUrl + 'expense/', post)
            // thunkAPI.dispatch(getIncoming({id: post.incoming}))
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(apiError(e as Error | AxiosError))
        }
    }
)

export const updateExpense = createAsyncThunk(
    'updateExpense',
    async (post: IExpense, thunkAPI) => {
        try {
            const {data} = await api.put<IExpense>(apiUrl + `expense/${post.id}/`, post)
            // thunkAPI.dispatch(getIncoming({id: post.incoming}))
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(apiError(e as Error | AxiosError))
        }
    }
)

export const deleteExpense = createAsyncThunk(
    'deleteExpense',
    async (query: IExpense, thunkAPI) => {
        try {
            await api.delete<IIncoming>(apiUrl + `expense/${query.id}/`,)
            // thunkAPI.dispatch(getIncoming({id: query.incoming}))
            return query
        } catch (e) {
            return thunkAPI.rejectWithValue(apiError(e as Error | AxiosError))
        }
    }
)