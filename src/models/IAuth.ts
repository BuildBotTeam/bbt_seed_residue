export interface IAuth {
    username: string
    password: string
}

export interface IAccessModel {
    id: number
    name: string
    name_plural: string
}

export interface IRole {
    id: number
    name: string
    edit: IAccessModel[]
    read: IAccessModel[]
}

export interface IAuthResponse {
    key: string
}