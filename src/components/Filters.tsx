import {useAppDispatch, useAppSelector} from "../hooks";
import React, {useEffect} from "react";
import {
    getCountryOrigin,
    getCrops, getGreenhouse,
    getIncoming,
    getProvider,
    getSeeds,
    getTypeSeeds
} from "../store/actions/seeds";
import {Autocomplete, Button, Checkbox, Paper, Stack, TextField} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import {useForm, Controller, Control} from "react-hook-form";
// import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
// import {ru} from "date-fns/locale";
// import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
// import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import InputMask from 'react-input-mask';
import {IFilter} from "../models/ISeeds";
import {useSearchParams} from "react-router-dom";
import {LoadingButton} from "@mui/lab";


type FormAutocompleteSelectProps = {
    fieldName: string,
    label: string,
    control: Control,
    searchList: any[],
    searchVal: string | null
    setValue(fieldName: string, value: any): void
}

function FormAutocompleteSelect(props: FormAutocompleteSelectProps) {
    const {fieldName, label, control, searchList, searchVal, setValue} = props

    useEffect(() => {
        if (searchList.length > 0 && searchVal) {
            setValue(fieldName, searchList.filter(val => searchVal.split(',').includes(val.id.toString())))
        }
    }, [searchList])

    return (
        <Controller
            name={fieldName}
            control={control}
            defaultValue={''}
            render={({field: {onChange, value}}) => (
                <Autocomplete
                    multiple
                    options={searchList}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.name}
                    value={value || []}
                    isOptionEqualToValue={(option, val) => option.id === val.id}
                    onChange={(_, val) => onChange(val)}
                    renderOption={(props, option, {selected}) => (
                        <li {...props}>
                            <Checkbox
                                style={{marginRight: 8}}
                                checked={selected}
                            />
                            {option.name}
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField {...params} label={label} size={'small'}/>
                    )}
                />)}
        />
    )
}


export default function FiltersForm() {
    const {handleSubmit, control, reset, setValue} = useForm();
    const dispatch = useAppDispatch()
    const [search, setSearch] = useSearchParams()
    const {
        type_seeds,
        provider,
        crops,
        country_origin,
        seeds,
        greenhouse,
    } = useAppSelector(state => state.seedsReducer)
    const {isLoading} = useAppSelector(state => state.authReducer)

    useEffect(() => {
        dispatch(getTypeSeeds())
        dispatch(getSeeds())
        dispatch(getProvider())
        dispatch(getCountryOrigin())
        dispatch(getCrops())
        dispatch(getGreenhouse())
    }, [])

    useEffect(() => {
        if (search.toString()) {
            dispatch(getIncoming(search))
            setDefVal()
        } else {
            dispatch(getIncoming({real_balance__range: '1,9999999'}))
        }
    }, [search])

    function setDefVal() {
        const searchObj = Object.fromEntries(search)
        if (searchObj.amount__range) {
            const amountRange = searchObj.amount__range.split(',')
            setValue('amount_start', amountRange[0])
            setValue('amount_end', amountRange[1])
        }
        if (searchObj.real_balance__range) {
            const realBalanceRange = searchObj.real_balance__range.split(',')
            setValue('real_balance_start', realBalanceRange[0])
            setValue('real_balance_end', realBalanceRange[1])
        }
    }

    function onSubmit(data: any) {
        data.seed__type_seeds__in = data.seed__type_seeds__in.length > 0 && data.seed__type_seeds__in.map((val: IFilter) => val.id).join(',')
        data.seed__in = data.seed__in.length > 0 && data.seed__in.map((val: IFilter) => val.id).join(',')
        data.provider__in = data.provider__in.length > 0 && data.provider__in.map((val: IFilter) => val.id).join(',')
        data.seed__crops__in = data.seed__crops__in.length > 0 && data.seed__crops__in.map((val: IFilter) => val.id).join(',')
        data.country_origin__in = data.country_origin__in.length > 0 && data.country_origin__in.map((val: IFilter) => val.id).join(',')
        data.expense__number_greenhouse__in = data.expense__number_greenhouse__in.length > 0 && data.expense__number_greenhouse__in.map((val: IFilter) => val.id).join(',')
        data.amount__range = `${!data.amount_start && data.amount_end ? '0' : data.amount_start || ''},${data.amount_start && !data.amount_end ? '9999999' : data.amount_end || ''}`
        data.real_balance__range = `${!data.real_balance_start && data.real_balance_end ? '0' : data.real_balance_start || ''},${data.real_balance_start && !data.real_balance_end ? '9999999' : data.real_balance_end || ''}`
        data.amount_start = undefined
        data.amount_end = undefined
        data.real_balance_start = undefined
        data.real_balance_end = undefined
        let newData: any = {}
        Object.keys(data).forEach(key => {
            if (data[key] && data[key] !== ',') newData[key] = data[key]
        })
        setSearch(newData)
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
                    <Grid xs={12} md={4} lg={3}>
                        <Controller
                            name={'crop_year'}
                            control={control}
                            defaultValue={''}
                            render={({field}) => (
                                <InputMask {...field} mask="9999" maskPlaceholder={null}>
                                    <TextField label={'Год'} size={'small'} fullWidth/>
                                </InputMask>)}
                        />
                    </Grid>
                    <Grid xs={12} md={4} lg={3}>
                        <FormAutocompleteSelect
                            fieldName={'seed__type_seeds__in'} label={'Тип семян'} control={control}
                            searchVal={search.get('seed__type_seeds__in')} searchList={type_seeds}
                            setValue={setValue}
                        />
                    </Grid>
                    <Grid xs={12} md={4} lg={3}>
                        <FormAutocompleteSelect
                            fieldName={'expense__number_greenhouse__in'} label={'Отделение'} control={control}
                            searchVal={search.get('expense__number_greenhouse__in')} searchList={greenhouse}
                            setValue={setValue}
                        />
                    </Grid>
                    <Grid xs={12} md={4} lg={3}>
                        <FormAutocompleteSelect
                            fieldName={'seed__in'} label={'Семена'} control={control}
                            searchVal={search.get('seed__in')} searchList={seeds}
                            setValue={setValue}
                        />
                    </Grid>
                    <Grid xs={12} md={4} lg={3}>
                        <FormAutocompleteSelect
                            fieldName={'provider__in'} label={'Поставщик'} control={control}
                            searchVal={search.get('provider__in')} searchList={provider}
                            setValue={setValue}
                        />
                    </Grid>
                    <Grid xs={12} md={4} lg={3}>
                        <FormAutocompleteSelect
                            fieldName={'seed__crops__in'} label={'Культура'} control={control}
                            searchVal={search.get('seed__crops__in')} searchList={crops}
                            setValue={setValue}
                        />
                    </Grid>
                    <Grid xs={12} md={4} lg={3}>
                        <FormAutocompleteSelect
                            fieldName={'country_origin__in'} label={'Страна поставщик'} control={control}
                            searchVal={search.get('country_origin__in')} searchList={country_origin}
                            setValue={setValue}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} lg={3}>
                        <Stack spacing={2} direction={'row'}>
                            <Controller
                                name={'amount_start'}
                                control={control}
                                defaultValue={''}
                                render={({field}) => (
                                    <InputMask {...field} mask="9999999" maskPlaceholder={null}>
                                        <TextField label={'Количество от'} size={'small'}/>
                                    </InputMask>
                                )}
                            />
                            <Controller
                                name={'amount_end'}
                                control={control}
                                defaultValue={''}
                                render={({field}) => (
                                    <InputMask {...field} mask="9999999" maskPlaceholder={null}>
                                        <TextField label={'Количество до'} size={'small'}/>
                                    </InputMask>
                                )}
                            />
                        </Stack>
                    </Grid>
                    <Grid xs={12} sm={6} md={4} lg={3}>
                        <Stack spacing={2} direction={'row'}>
                            <Controller
                                name={'real_balance_start'}
                                control={control}
                                defaultValue={'1'}
                                render={({field: {onChange, value}}) => (
                                    <InputMask value={value} onChange={onChange} mask="9999999" maskPlaceholder={null}>
                                        <TextField label={'Остаток от'} size={'small'}/>
                                    </InputMask>
                                )}
                            />
                            <Controller
                                name={'real_balance_end'}
                                control={control}
                                defaultValue={'9999999'}
                                render={({field}) => (
                                    <InputMask {...field} mask="9999999" maskPlaceholder={null}>
                                        <TextField label={'Остаток до'} size={'small'}/>
                                    </InputMask>
                                )}
                            />
                        </Stack>
                    </Grid>
                    <Grid xs={12} sm={6} md={4} lg={3} smOffset={6} mdOffset={4} lgOffset={3}>
                        <Stack spacing={2} direction={'row'} sx={{float: 'right'}}>
                            <Button variant={'contained'} color={'error'} disabled={isLoading}
                                    onClick={() => {
                                        setSearch({})
                                        reset({real_balance_start: '1', real_balance_end: '9999999'})
                                    }}>
                                Сбросить
                            </Button>
                            <LoadingButton loading={isLoading} type={'submit'}
                                           variant={'contained'}>Найти</LoadingButton>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    )
}
