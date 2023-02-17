export interface IPagination<Type> {
    count: number
    next: string | null
    previous: string | null
    results: Type
}


export interface IFilter {
    id: string
    name: string
}

export interface ISeeds {
    id: number
    name: string
    type_seeds: number
    hybrid: number
    crops: number
}

export interface IIncoming {
    id: number
    date_time: string
    seed: number
    part_number: number
    crop_year: number
    provider: number
    country_origin: number
    amount: number
    real_balance: number
    gift: number
    unit: number
    package_opened: boolean
    comment: string
    unit_name: string
}

export interface IIncomingExpense {
    [incoming: number]: IExpense[]
}

export interface IExpense {
    id: number
    date_time: string
    number_greenhouse: number
    amount: number
    rows: string
    germination: string
    incoming: number
    comment: string
}

export interface ISendFilter {
    type_seeds: string
    hybrid: string
    provider: string
    crops: string
    country_origin: string
}