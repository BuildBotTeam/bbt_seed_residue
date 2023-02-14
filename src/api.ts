import axios, {AxiosError} from 'axios'

const actualUrl = {
    'test': {hostname: '192.168.252.192', port: null, protocol: 'http:', ws: 'ws'},
    'main': {
        hostname: window.location.hostname,
        port: window.location.port,
        protocol: window.location.protocol,
        ws: 'wss'
    },
}

const server = ['3000', '3001'].includes(window.location.port) ? 'test' : 'main'

export function getHostname(server: keyof typeof actualUrl) {
    const {hostname, port, protocol} = actualUrl[server]
    return `${protocol}//${hostname}${port ? ':' + port : ''}`
}

export const apiUrl = `${getHostname(server)}/api/`
export const restAuthUrl = `${getHostname(server)}/rest-auth/`


const api = axios.create({
    baseURL: apiUrl,
    responseType: "json",
});
// api.interceptors.request.use((config) => {
//     config.headers["X-CSRFToken"] = Cookies.get("csrftoken");
//     // console.log("api.interceptors.request: ", config.headers);
//     return config;
// });

export const authSuccess = () => {
    api.interceptors.request.use(config => {
        config.headers["Authorization"] = `Token ${localStorage.getItem('token')}`;
        return config
    })
}

export interface IApiError {
    code: number
    message: string
}

export const apiError = (e: Error | AxiosError) => {
    if (axios.isAxiosError(e)) {
        let data = e.response?.data
        if (typeof data === 'string' && data.length < 100) return {code: e.response?.status, message: data}
        return {code: e.response?.status, message: e.message.toString()}
    }
    return {code: 0, message: e?.message}
}

export default api