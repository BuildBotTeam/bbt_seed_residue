import * as React from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useAppDispatch, useAppSelector} from "../hooks";
import {useEffect} from "react";
import {getIncoming} from "../store/actions/seeds";
import moment from "moment/moment";

export default function SeedsTable() {
    const dispatch = useAppDispatch()
    const {incoming} = useAppSelector(state => state.seedsReducer)

    useEffect(() => {
        dispatch(getIncoming({amount__range: '1,9999999'}))
    }, [])

    const columns: GridColDef[] = [
        {field: 'part_number', headerName: 'part_number', width: 150},
        {
            field: 'date_time', headerName: 'date_time', type: 'dateTime',
            valueGetter: ({value}) => value && moment(value).format('DD-MM-YYYY'),
        },
        {field: 'seed', headerName: 'seed'},
        {field: 'crop_year', headerName: 'crop_year'},
        {field: 'provider', headerName: 'provider'},
        {field: 'country_origin', headerName: 'country_origin'},
        {field: 'package_opened', headerName: 'package_opened'},
        {field: 'amount', headerName: 'amount'},
        {field: 'comment', headerName: 'comment'},
    ];

    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid rows={incoming} columns={columns} disableColumnMenu/>
        </div>
    );
}