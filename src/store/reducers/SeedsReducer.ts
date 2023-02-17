import {createSlice} from "@reduxjs/toolkit";
import {IFilter, IIncoming, IIncomingExpense, ISeeds} from "../../models/ISeeds";
import {
    createExpense,
    createIncoming, deleteExpense, deleteIncoming,
    getCountryOrigin,
    getCrops, getExpense, getGreenhouse,
    getHybrid,
    getIncoming,
    getProvider,
    getSeeds,
    getTypeSeeds, getUnits, updateExpense, updateIncoming
} from "../actions/seeds";
import {deleteElementFromList, updateElementInList} from "../../utils";


interface ISeedsState {
    type_seeds: IFilter[]
    greenhouse: IFilter[]
    hybrid: IFilter[]
    provider: IFilter[]
    crops: IFilter[]
    country_origin: IFilter[]
    seeds: ISeeds[]
    units: IFilter[]
    incoming: IIncoming[]
    expense: IIncomingExpense
}

const initialState: ISeedsState = {
    type_seeds: [],
    greenhouse: [],
    hybrid: [],
    provider: [],
    crops: [],
    country_origin: [],
    seeds: [],
    units: [],
    incoming: [],
    expense: {},
}

export const seedsSlice = createSlice({
    name: 'seeds',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCrops.fulfilled, (state, {payload}) => {
            state.crops = payload
        })
        builder.addCase(getGreenhouse.fulfilled, (state, {payload}) => {
            state.greenhouse = payload
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
        builder.addCase(getUnits.fulfilled, (state, {payload}) => {
            state.units = payload
        })
        builder.addCase(getIncoming.fulfilled, (state, {payload}) => {
            if (!Array.isArray(payload)) {
                state.incoming = updateElementInList(state.incoming, payload)
            } else {
                state.incoming = payload
            }
        })
        builder.addCase(createIncoming.fulfilled, (state, {payload}) => {
            state.incoming = [payload, ...state.incoming]
        })
        builder.addCase(updateIncoming.fulfilled, (state, {payload}) => {
            state.incoming = updateElementInList(state.incoming, payload)
        })
        builder.addCase(deleteIncoming.fulfilled, (state, {payload}) => {
            state.incoming = deleteElementFromList(state.incoming, payload)
        })
        builder.addCase(getExpense.fulfilled, (state, {payload}) => {
            state.expense = Object.assign(state.expense, payload)
        })
        builder.addCase(createExpense.fulfilled, (state, {payload}) => {
            state.expense[payload.incoming] = [payload, ...state.expense[payload.incoming]]
        })
        builder.addCase(updateExpense.fulfilled, (state, {payload}) => {
            state.expense[payload.incoming] = updateElementInList(state.expense[payload.incoming], payload)
        })
        builder.addCase(deleteExpense.fulfilled, (state, {payload}) => {
            state.expense[payload.incoming] = deleteElementFromList(state.expense[payload.incoming], payload.id)
        })
    }
})

export default seedsSlice.reducer
