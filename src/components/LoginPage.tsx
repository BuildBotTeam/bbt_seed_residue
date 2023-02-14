import React, {useState, useEffect} from 'react';
import {Box, Button, IconButton, InputAdornment, Paper, Stack, TextField, Typography} from "@mui/material";
import {useForm, Controller} from "react-hook-form";
import {getHostname} from "../api";
import {checkToken, login} from "../store/actions/auth";
import {useAppDispatch, useAppSelector} from "../hooks";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useNavigate} from "react-router-dom";
import {LoadingButton} from "@mui/lab";


export default function LoginPage() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {control, handleSubmit} = useForm()
    const {token, isLoading} = useAppSelector(state => state.authReducer)
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if (token) navigate('/home', {replace: true})
    }, [token])

    function onSubmit(value: any) {
        dispatch(login(value))
        setShowPassword(false)
    }

    return (
        <Box sx={{padding: 1}}>
            <Paper sx={{
                margin: {xs: '50px auto', sm: '300px auto 0 auto'},
                position: 'relative',
                width: {xs: '100%', sm: 500},
                padding: 1,
                minWidth: 350,
            }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2} sx={{padding: 1}}>
                        <Typography variant={'h3'} sx={{textAlign: 'center'}}>Добро пожаловать</Typography>
                        <Controller
                            name={'username'}
                            control={control}
                            defaultValue={''}
                            render={({field}) => (
                                <TextField {...field} label="Логин" fullWidth/>
                            )}
                        />
                        <Controller
                            name={'password'}
                            control={control}
                            defaultValue={''}
                            render={({field}) => (
                                <TextField {...field} label="Пароль" type={showPassword ? 'text' : 'password'} fullWidth
                                           InputProps={{ // <-- This is where the toggle button is added.
                                               endAdornment: (
                                                   <InputAdornment position="end">
                                                       <IconButton
                                                           aria-label="toggle password visibility"
                                                           onClick={() => setShowPassword(val => !val)}
                                                       >
                                                           {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                                                       </IconButton>
                                                   </InputAdornment>
                                               )
                                           }}/>
                            )}
                        />
                        <Box>
                            <Stack sx={{float: 'right'}} direction={'row'} spacing={2}>
                                <Button size={'small'} variant={'text'}
                                        href={`http://localhost:3000/remote_auth?service=seeds&url=${getHostname('main')}/remote_auth`}>
                                    Войти через основной сайт
                                </Button>
                                <LoadingButton loading={isLoading} sx={{float: 'right'}} size={'large'} type={'submit'}
                                               variant={'contained'}>Войти</LoadingButton>
                            </Stack>
                        </Box>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
}
