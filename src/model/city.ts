export type City = {
    _id: string,
    date: string,
    icon: string,
    key: string,
    localCity:string,
    isFavorite:boolean,
    temp: {
        Imperial: {
            Value: number,
            Unit: string,
            UnitType: number,
        },
        Metric: {
            Value: number,
            Unit: string,
            UnitType: number,
        },
    },
    weatherText: string
}

export type upCity = {
    _id: string,
    key: string,
    localCity: string,
    date: string,
    weatherText: string,
    icon: string,
    temp: {},
    isFavorite:boolean
}

