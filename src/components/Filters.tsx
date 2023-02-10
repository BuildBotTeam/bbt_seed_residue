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
import {Autocomplete, Box, Button, Checkbox, Stack, TextField, TextFieldProps} from "@mui/material";
import {useForm, Controller} from "react-hook-form";
import {DateRangePicker, DateRange} from '@mui/x-date-pickers-pro/DateRangePicker';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {ru} from "date-fns/locale";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import InputMask from 'react-input-mask';
import moment from "moment/moment";

export const FiltersForm = () => {
    const {handleSubmit, control} = useForm();
    const dispatch = useAppDispatch()
    const {type_seeds, provider, crops, country_origin, seeds} = useAppSelector(state => state.seedsReducer)
    const [value, setValue] = useState<string>()

    useEffect(() => {
        dispatch(getTypeSeeds())
        dispatch(getSeeds())
        dispatch(getProvider())
        dispatch(getCountryOrigin())
        dispatch(getCrops())
    }, [])

    function onSubmit(data: any) {
        dispatch(getIncoming(data))
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}>
            <Stack direction={'row'} spacing={2}>
                <TextField label="Номер партии" size={'small'}/>
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
                <InputMask mask="9999" maskChar={null}>
                    {() => (<TextField name={'crop_year'} label={'Год'} fullWidth/>)}
                </InputMask>
                <Controller
                    name={'seed__type_seeds__in'}
                    control={control}
                    render={({field: {onChange}}) => (
                        <Autocomplete
                            multiple
                            options={type_seeds}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.name}
                            onChange={(_, value) => onChange(value.map(val => val.id).join(','))}
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
                            style={{width: 300}}
                            renderInput={(params) => (
                                <TextField {...params} label="Тип семян" size={'small'}/>
                            )}
                        />)}
                />
                <Controller
                    name={'seed__in'}
                    control={control}
                    render={({field: {onChange}}) => (
                        <Autocomplete
                            multiple
                            options={seeds}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.name}
                            onChange={(_, value) => onChange(value.map(val => val.id).join(','))}
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
                            style={{width: 300}}
                            renderInput={(params) => (
                                <TextField {...params} label="Семена" size={'small'}/>
                            )}
                        />)}
                />
                <Controller
                    name={'provider__in'}
                    control={control}
                    render={({field: {onChange}}) => (
                        <Autocomplete
                            multiple
                            options={provider}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.name}
                            onChange={(_, value) => onChange(value.map(val => val.id).join(','))}
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
                            style={{width: 300}}
                            renderInput={(params) => (
                                <TextField {...params} label="Поставщик" size={'small'}/>
                            )}
                        />)}
                />
                <Controller
                    name={'seed__crops__in'}
                    control={control}
                    render={({field: {onChange}}) => (
                        <Autocomplete
                            multiple
                            options={crops}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.name}
                            onChange={(_, value) => onChange(value.map(val => val.id).join(','))}
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
                            style={{width: 300}}
                            renderInput={(params) => (
                                <TextField {...params} label="Культура" size={'small'}/>
                            )}
                        />)}
                />
                <Controller
                    name={'country_origin__in'}
                    control={control}
                    render={({field: {onChange}}) => (
                        <Autocomplete
                            multiple
                            options={country_origin}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.name}
                            onChange={(_, value) => onChange(value.map(val => val.id).join(','))}
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
                            style={{width: 300}}
                            renderInput={(params) => (
                                <TextField {...params} label="Страна поставщик" size={'small'}/>
                            )}
                        />)}
                />
                <Box>
                    <Button type={'submit'} variant={'contained'}>Найти</Button>
                </Box>
            </Stack>
        </form>
    )
}

export default FiltersForm


