import React, {useEffect} from 'react';
import './App.scss';
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import {checkToken, logout} from "./store/actions/auth";
import {useAppDispatch, useAppSelector} from "./hooks";
import {
    createTheme,
    CssBaseline,
    ThemeProvider
} from '@mui/material';
import {useSnackbar} from "notistack";
import HomePage from "./components/HomePage";

const theme = createTheme({
    typography: {
        fontFamily: 'Arial',
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
    const {user, token, error} = useAppSelector(state => state.authReducer)

    useEffect(() => {
        if (error?.message && error?.code !== 401) {
            enqueueSnackbar(error.message, {variant: 'error'})
        }
    }, [error])

    useEffect(() => {
        dispatch(checkToken())
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    const routes = () => {
        let sToken = localStorage.getItem('token')
        if (location.pathname === '/logout') {
            dispatch(logout())
        }
        // if (!token && !sToken) {
        //     return (
        //         <Routes>
        //             <Route path={'*'} element={<Navigate replace to={'login'}/>}/>
        //             <Route path="login" element={<div/>}/>
        //         </Routes>
        //     )
        // }
        // if (user) {
            return (
                <Routes>
                    <Route path="login" element={<Navigate to={'/'}/>}/>
                    <Route path="change_password" element={<Navigate to={'/'}/>}/>
                    <Route path="/" element={<HomePage/>}/>
                </Routes>
            )
        // }
        // return (
        //     <Box className={'login-container'}>
        //     </Box>
        // )
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <CssBaseline/>
                {routes()}
            </div>
        </ThemeProvider>
    )
}

export default App;
