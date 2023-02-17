import React, {useEffect, useMemo, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks";
import {IExpense} from "../models/ISeeds";
import MaterialTable, {Column} from "material-table";
import {LocalizationProvider} from "@mui/x-date-pickers-pro";
import {ru} from "date-fns/locale";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {Box, TextField} from "@mui/material";
import {convertListToObject, localizationMT} from "../utils";
import moment from "moment";
import {createExpense, deleteExpense, getExpense, updateExpense} from "../store/actions/seeds";

type ExpenseTableProps = {
    incoming: number
    unit_name: string
}

export default function ExpenseTable({incoming, unit_name}: ExpenseTableProps) {
    const dispatch = useAppDispatch()
    const {seeds, provider, country_origin, expense, greenhouse} = useAppSelector(state => state.seedsReducer)
    const [data, setData] = useState<IExpense[]>([])


    useEffect(() => {
        if (!(incoming in expense)) dispatch(getExpense({incoming: incoming}))
    }, [])

    const columns = useMemo<Column<IExpense>[]>(() => ([
            {
                title: 'Дата расхода', field: 'date_time', type: 'date',
                validate: rowData => !!rowData.date_time,
                editComponent: props => (
                    <LocalizationProvider adapterLocale={ru} dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label={'дд.мм.гггг'}
                            value={props.value || null}
                            onChange={props.onChange}
                            renderInput={(params: any) => <TextField {...params}/>}
                        />
                    </LocalizationProvider>
                )
            }, {
                title: 'Отделение', field: 'number_greenhouse',
                lookup: greenhouse && convertListToObject(greenhouse),
                validate: rowData => !!rowData.number_greenhouse,
            }, {
                title: 'Ед. измерения', field: 'unit', editable: 'never', emptyValue: unit_name
            }, {
                title: 'Количество', field: 'amount', type: 'numeric', align: 'center',
                validate: rowData => !!rowData.amount,
            }, {
                title: 'Ряды', field: 'rows',
            }, {
                title: 'Всхожесть, %', field: 'germination',
            }, {
                title: 'Комментарий', field: 'comment', cellStyle: {minWidth: '250px'},
                editComponent: ({value, onChange}) => (
                    <TextField value={value} onChange={e => onChange(e.target.value)}
                               inputProps={{sx: {fontSize: '13px'}}}
                               sx={{minWidth: 250}} multiline maxRows={4}/>
                )
            },

        ]),
        [seeds, country_origin, provider, unit_name]
    )

    const options: any = useMemo(() => ({
        pageSize: 10,
        draggable: false,
        addRowPosition: 'first'
        // rowStyle: (rowData: IIncoming) => colorCell[rowData.general_state]
    }), [data])

    useEffect(() => {
        if (incoming in expense) setData(expense[incoming].map(value => ({...value, unit: unit_name, tableData: {}})))
    }, [expense])

    return (
        <Box sx={{marginLeft: 2}}>
            <MaterialTable
                title={'Расход семян'}
                options={options}
                localization={localizationMT}
                style={{display: 'grid'}}
                columns={columns.map((c) => ({...c, tableData: undefined}))}
                data={data}
                // actions={actions}
                editable={{
                    onRowAdd: newData => {
                        newData.date_time = moment(newData.date_time).format('YYYY-MM-DD')
                        newData.incoming = incoming
                        return dispatch(createExpense(newData))
                    },
                    onRowUpdate: (newData) => {
                        newData.date_time = moment(newData.date_time).format('YYYY-MM-DD')
                        newData.incoming = incoming
                        return dispatch(updateExpense(newData))
                    },
                    onRowDelete: oldData => dispatch(deleteExpense(oldData))
                }}
            />
        </Box>
    );
};

