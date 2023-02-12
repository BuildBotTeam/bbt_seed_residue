import {useAppDispatch, useAppSelector} from "../hooks";
import React, {useEffect, useState} from "react";
import {
    getCountryOrigin,
    getCrops,
    getIncoming,
    getProvider,
    getSeeds,
    getTypeSeeds
} from "../store/actions/seeds";
import {Autocomplete, Box, Button, Checkbox, Paper, Stack, TextField, TextFieldProps} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import {useForm, Controller} from "react-hook-form";
import {DateRangePicker, DateRange} from '@mui/x-date-pickers-pro/DateRangePicker';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {ru} from "date-fns/locale";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import InputMask from 'react-input-mask';
import moment from "moment/moment";
import {IFilter} from "../models/ISeeds";

export const FiltersForm = () => {
    const {handleSubmit, control, reset} = useForm();
    const dispatch = useAppDispatch()
    const {type_seeds, provider, crops, country_origin, seeds} = useAppSelector(state => state.seedsReducer)

    useEffect(() => {
        dispatch(getTypeSeeds())
        dispatch(getSeeds())
        dispatch(getProvider())
        dispatch(getCountryOrigin())
        dispatch(getCrops())
    }, [])

    function onSubmit(data: any) {
        data.seed__type_seeds__in = data.seed__type_seeds__in.length > 0 ? data.seed__type_seeds__in.map((val: IFilter) => val.id).join(',') : undefined
        data.seed__in = data.seed__in.length > 0 ? data.seed__in.map((val: IFilter) => val.id).join(',') : undefined
        data.provider__in = data.provider__in.length > 0 ? data.provider__in.map((val: IFilter) => val.id).join(',') : undefined
        data.seed__crops__in = data.seed__crops__in.length > 0 ? data.seed__crops__in.map((val: IFilter) => val.id).join(',') : undefined
        data.country_origin__in = data.country_origin__in.length > 0 ? data.country_origin__in.map((val: IFilter) => val.id).join(',') : undefined
        if (data.amount_start && data.amount_end) {
            data.amount__range = `${data.amount_start},${data.amount_end}`
        }
        delete data.amount_start
        delete data.amount_end
        dispatch(getIncoming(data))
    }

    return (
        <Paper sx={{p: 2}}>
            <form
                onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={4} lg={3}>
                        <Controller
                            name={'part_number__contains'}
                            control={control}
                            defaultValue={''}
                            render={({field}) => (
                                <TextField {...field} label="Номер партии" size={'small'} fullWidth/>
                            )}
                        />
                    </Grid>
                    {/*<Controller*/}
                    {/*    name={'crop_year'}*/}
                    {/*    control={control}*/}
                    {/*    render={({field: {onChange, value}}) => (*/}
                    {/*        <LocalizationProvider adapterLocale={ru} dateAdapter={AdapterDateFns}>*/}
                    {/*            <DatePicker*/}
                    {/*                label='Дата доставки'*/}
                    {/*                value={value}*/}
                    {/*                minDate={new Date('2022-01-01')}*/}
                    {/*                views={['year']}*/}
                    {/*                onChange={onChange}*/}
                    {/*                renderInput={(params: any) => <TextField required {...params}/>}*/}
                    {/*            />*/}
                    {/*        </LocalizationProvider>*/}
                    {/*    )}*/}
                    {/*/>*/}
                    <Grid xs={12} md={4} lg={3}>
                        <Controller
                            name={'crop_year__exact'}
                            control={control}
                            defaultValue={''}
                            render={({field}) => (
                                <InputMask {...field} mask="9999" maskPlaceholder={null}>
                                    <TextField label={'Год'} size={'small'} fullWidth/>
                                </InputMask>)}
                        />
                    </Grid>
                    <Grid xs={12} md={4} lg={3}>
                        <Controller
                            name={'seed__type_seeds__in'}
                            control={control}
                            defaultValue={''}
                            render={({field: {onChange, value}}) => (
                                <Autocomplete
                                    multiple
                                    options={type_seeds}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.name}
                                    value={value || []}
                                    isOptionEqualToValue={(option, val) => option.id === val.id}
                                    onChange={(_, val) => onChange(val)}
                                    renderOption={(props, option, {selected}) => (
                                        <li {...props}>
                                            <Checkbox
                                                // icon={icon}
                                                // checkedIcon={checkedIcon}
                                                style={{marginRight: 8}}
                                                checked={selected}
                                            />
                                            {option.name}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Тип семян" size={'small'}/>
                                    )}
                                />)}
                        />
                    </Grid>
                    <Grid xs={12} md={4} lg={3}>
                        <Controller
                            name={'seed__in'}
                            control={control}
                            defaultValue={''}
                            render={({field: {onChange, value}}) => (
                                <Autocomplete
                                    multiple
                                    options={seeds}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.name}
                                    value={value || []}
                                    isOptionEqualToValue={(option, val) => option.id === val.id}
                                    onChange={(_, val) => onChange(val)}
                                    renderOption={(props, option, {selected}) => (
                                        <li {...props}>
                                            <Checkbox
                                                // icon={icon}
                                                // checkedIcon={checkedIcon}
                                                style={{marginRight: 8}}
                                                checked={selected}
                                            />
                                            {option.name}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Семена" size={'small'}/>
                                    )}
                                />)}
                        />
                    </Grid>
                    <Grid xs={12} md={4} lg={3}>
                        <Controller
                            name={'provider__in'}
                            control={control}
                            defaultValue={''}
                            render={({field: {onChange, value}}) => (
                                <Autocomplete
                                    multiple
                                    options={provider}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.name}
                                    value={value || []}
                                    isOptionEqualToValue={(option, val) => option.id === val.id}
                                    onChange={(_, val) => onChange(val)}
                                    renderOption={(props, option, {selected}) => (
                                        <li {...props}>
                                            <Checkbox
                                                // icon={icon}
                                                // checkedIcon={checkedIcon}
                                                style={{marginRight: 8}}
                                                checked={selected}
                                            />
                                            {option.name}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Поставщик" size={'small'}/>
                                    )}
                                />)}
                        />
                    </Grid>
                    <Grid xs={12} md={4} lg={3}>
                        <Controller
                            name={'seed__crops__in'}
                            control={control}
                            defaultValue={''}
                            render={({field: {onChange, value}}) => (
                                <Autocomplete
                                    multiple
                                    options={crops}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.name}
                                    value={value || []}
                                    isOptionEqualToValue={(option, val) => option.id === val.id}
                                    onChange={(_, val) => onChange(val)}
                                    renderOption={(props, option, {selected}) => (
                                        <li {...props}>
                                            <Checkbox
                                                // icon={icon}
                                                // checkedIcon={checkedIcon}
                                                style={{marginRight: 8}}
                                                checked={selected}
                                            />
                                            {option.name}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Культура" size={'small'}/>
                                    )}
                                />)}
                        />
                    </Grid>
                    <Grid xs={12} md={4} lg={3}>
                        <Controller
                            name={'country_origin__in'}
                            control={control}
                            defaultValue={''}
                            render={({field: {onChange, value}}) => (
                                <Autocomplete
                                    multiple
                                    options={country_origin}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.name}
                                    value={value || []}
                                    isOptionEqualToValue={(option, val) => option.id === val.id}
                                    onChange={(_, val) => onChange(val)}
                                    renderOption={(props, option, {selected}) => (
                                        <li {...props}>
                                            <Checkbox
                                                // icon={icon}
                                                // checkedIcon={checkedIcon}
                                                style={{marginRight: 8}}
                                                checked={selected}
                                            />
                                            {option.name}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Страна поставщик" size={'small'}/>
                                    )}
                                />)}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} lg={3}>
                        <Stack spacing={2} direction={'row'}>
                            <Controller
                                name={'amount_start'}
                                control={control}
                                defaultValue={'1'}
                                render={({field}) => (
                                    <InputMask {...field} mask="9999999" maskPlaceholder={null}>
                                        <TextField label={'Количество от'} size={'small'}/>
                                    </InputMask>
                                )}
                            />
                            <Controller
                                name={'amount_end'}
                                control={control}
                                defaultValue={'9999999'}
                                render={({field}) => (
                                    <InputMask {...field} mask="9999999" maskPlaceholder={null}>
                                        <TextField label={'Количество до'} size={'small'}/>
                                    </InputMask>
                                )}
                            />
                        </Stack>
                    </Grid>
                    <Grid xs={12} sm={6} md={4} lg={3} lgOffset={9}>
                        <Stack spacing={2} direction={'row'} sx={{float: 'right'}}>
                            <Button variant={'contained'} color={'error'}
                                    onClick={() => {
                                        reset({amount_start: '1', amount_end: '9999999'})
                                        dispatch(getIncoming({amount__range: '1,9999999'}))
                                    }}>
                                Сбросить
                            </Button>
                            <Button type={'submit'} variant={'contained'}>Найти</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    )
}

export default FiltersForm


