import {createSlice} from "@reduxjs/toolkit";
import {IExpense, IFilter, IIncoming, ISeeds} from "../../models/ISeeds";
import {getCountryOrigin, getCrops, getHybrid, getProvider, getSeeds, getTypeSeeds} from "../actions/seeds";


interface ISeedsState {
    type_seeds: IFilter[]
    hybrid: IFilter[]
    provider: IFilter[]
    crops: IFilter[]
    country_origin: IFilter[]
    seeds: ISeeds[]
    incoming: IIncoming[]
    expense: IExpense[]
}

const initialState: ISeedsState = {
    type_seeds: [],
    hybrid: [],
    provider: [],
    crops: [],
    country_origin: [],
    seeds: [],
    incoming: [],
    expense: [],
}

export const seedsSlice = createSlice({
    name: 'seeds',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCrops.fulfilled, (state, {payload}) => {
            state.crops = payload
        })
        builder.addCase(getTypeSeeds.fulfilled, (state, {payload}) => {
            state.type_seeds = payload
        })
        builder.addCase(getHybrid.fulfilled, (state, {payload}) => {
            state.hybrid = payload
        })
        builder.addCase(getProvider.fulfilled, (state, {payload}) => {
            state.provider = payload
        })
        builder.addCase(getCountryOrigin.fulfilled, (state, {payload}) => {
            state.country_origin = payload
        })
        builder.addCase(getSeeds.fulfilled, (state, {payload}) => {
            state.seeds = payload
        })
    }
})

export default seedsSlice.reducer
