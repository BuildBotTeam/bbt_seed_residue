import React, {useEffect} from 'react';
import './App.scss';
import {Navigate, Route, Routes, useLocation, useSearchParams} from "react-router-dom";
import {checkToken, logout} from "./store/actions/auth";
import {useAppDispatch, useAppSelector} from "./hooks";
import {
    createTheme,
    ThemeProvider
} from '@mui/material';
import {useSnackbar} from "notistack";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import {rejectRemoteAuth} from "./store/reducers/AuthReducer";

const theme = createTheme({
    typography: {
        fontFamily: 'Arial',
        h1: {
            fontFamily: 'CLEANVEB',
            fontSize: '5rem',
            fontWeight: 'bold',
        },
        h6: {
            fontFamily: 'CLEANVEB',
            fontSize: '2.5rem',
        },
    },
    palette: {
        // mode: 'dark',
        background: {
            // default: '#d7edf1',
            paper: '#f5f8f8'
        },
        primary: {
            main: '#2c6e6a',
        },
        secondary: {
            main: '#2da3c2'
        },
    },
    components: {
        MuiListItem: {
            styleOverrides: {
                root: {
                    transition: '500ms',
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(44,109,106, 0.7)',

                        'svg, span': {
                            color: '#f5f8f8'
                        }
                    }
                }
            }
        }
    }
});


const App: React.FC = () => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const {enqueueSnackbar} = useSnackbar()
    const [search] = useSearchParams()
    const {isAuth, authState, error} = useAppSelector(state => state.authReducer)

    useEffect(() => {
        if (error?.message && error?.code !== 401) {
            enqueueSnackbar(error.message, {variant: 'error'})
        }
    }, [error])

    useEffect(() => {
        if (location.pathname === '/logout') {
            dispatch(logout())
        } else {
            console.log(location)
            if (search.get('error')) {
                dispatch(rejectRemoteAuth({
                    error: {
                        message: 'Вы не авторизированы на основном сайте',
                        code: search.get('error')
                    }
                }))
            } else {
                dispatch(checkToken(search.get('token')))
            }
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    const routes = () => {
        if (authState) return <div/>
        if (!authState && !isAuth) {
            return (
                <Routes>
                    <Route path={'*'} element={<Navigate replace to={'login'}/>}/>
                    <Route path="login" element={<LoginPage/>}/>
                </Routes>
            )
        }
        return (
            <Routes>
                <Route path="login" element={<Navigate to={'/'}/>}/>
                <Route path="change_password" element={<Navigate to={'/'}/>}/>
                <Route path="logout" element={<Navigate replace to={'login'}/>}/>
                <Route path="/" element={<HomePage/>}/>
                <Route path={'*'} element={<Navigate replace to={'/'}/>}/>
            </Routes>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            {routes()}
        </ThemeProvider>
    )
}

export default App;
