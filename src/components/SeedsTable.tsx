import * as React from 'react';
import {DataGrid, GridActionsCellItem, GridColumns, GridRowParams, ruRU} from '@mui/x-data-grid';
import {useAppDispatch, useAppSelector} from "../hooks";
import {useEffect} from "react";
import {getIncoming} from "../store/actions/seeds";
import moment from "moment/moment";
import {Paper} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export default function SeedsTable() {
    const dispatch = useAppDispatch()
    const {incoming} = useAppSelector(state => state.seedsReducer)

    useEffect(() => {
        dispatch(getIncoming({amount__range: '1,9999999'}))
    }, [])

    const columns: GridColumns = [
        {field: 'part_number', headerName: 'part_number', minWidth: 150},
        {
            field: 'date_time', headerName: 'date_time', type: 'date', minWidth: 150,
            valueFormatter: ({value}: any) => value && moment(value).format('DD.MM.YYYY'),
        },
        {field: 'seed', headerName: 'seed', minWidth: 150,},
        {field: 'crop_year', headerName: 'crop_year', minWidth: 150,},
        {field: 'provider', headerName: 'provider', minWidth: 150,},
        {field: 'country_origin', headerName: 'country_origin', minWidth: 150,},
        {field: 'package_opened', headerName: 'package_opened', minWidth: 150,},
        {field: 'amount', headerName: 'amount', minWidth: 150,},
        {field: 'comment', headerName: 'comment', minWidth: 150},
        {
            field: 'actions', type: 'actions', headerName: 'Действия', minWidth: 150,
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem
                    icon={<DeleteIcon/>}
                    label="Delete"
                    onClick={() => console.log(params.id)}
                />],
        },
    ];

    return (
        <Paper sx={{height: 400, width: '100%'}}>
            <DataGrid rows={incoming} columns={columns}
                      disableSelectionOnClick
                      localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                      onRowClick={(params, event) => console.log(params, event)}
                      disableColumnMenu/>
        </Paper>
    );
}