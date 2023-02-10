import {useAppDispatch, useAppSelector} from "../hooks";
import React, {useEffect} from "react";
import {getCountryOrigin, getCrops, getHybrid, getIncoming, getProvider, getTypeSeeds} from "../store/actions/seeds";
import {Autocomplete, Button, Checkbox, MenuItem, Stack, TextField} from "@mui/material";
import {useForm, Controller} from "react-hook-form";

export const FiltersForm = () => {
    const {handleSubmit, control} = useForm();
    const dispatch = useAppDispatch()
    const {type_seeds, hybrid, provider, crops, country_origin} = useAppSelector(state => state.seedsReducer)

    useEffect(() => {
        dispatch(getTypeSeeds())
        dispatch(getHybrid())
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
                <TextField label="Номер партии" size={'small'} />
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
                    name={'seed__hybrid__in'}
                    control={control}
                    render={({field: {onChange}}) => (
                        <Autocomplete
                            multiple
                            options={hybrid}
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
                                <TextField {...params} label="Гибрид" size={'small'}/>
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
                <Button type={'submit'} variant={'contained'} size={'small'}>Найти</Button>
            </Stack>
        </form>
    )
}

export default FiltersForm


