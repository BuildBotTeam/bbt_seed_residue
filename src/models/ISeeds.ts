export interface IFilter {
    id: string
    name: string
    type?: string
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
    package_opened: boolean
    comment: string
}

export interface IExpense {
    id: number
    date_time: string
    number_greenhouse: number
    amount: number
    amount_after_sowing: number
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