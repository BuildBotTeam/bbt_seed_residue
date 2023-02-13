import React from 'react';
import {Box, Button, Paper, Stack, TextField, Typography} from "@mui/material";
import {useForm, Controller} from "react-hook-form";
import {getHostname} from "../api";

export default function LoginPage() {
    const {control, handleSubmit} = useForm()

    return (
        <Box sx={{height: '100vh', width: '100vw', position: 'relative', padding: 2}}>
            <Paper sx={{
                margin: {xs: '50px auto', sm: '300px auto 0 auto'},
                display: 'inline-block',
                width: {xs: '100%', sm: 500},
                minWidth: 350,
            }}>
                <form>
                    <Stack spacing={2} sx={{padding: 1}}>
                        <Typography variant={'h3'}>Добро пожаловать</Typography>
                        <Controller
                            name={'login'}
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
                                <TextField {...field} label="Пароль" fullWidth/>
                            )}
                        />
                        <Box>
                            <Stack sx={{float: 'right'}} direction={'row'} spacing={2}>
                                <Button size={'small'} variant={'text'}
                                        href={`http://localhost:3000/remote_auth?service=seeds&url=${getHostname('main')}/remote_auth`}>
                                    Войти через основной сайт
                                </Button>
                                <Button sx={{float: 'right'}} size={'large'} type={'submit'}
                                        variant={'contained'}>Войти</Button>
                            </Stack>
                        </Box>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
}
