export type Forecasts = {
    _id: string
}

export type AllForecasts={
    _id: string,
    fiveDays:Fives[]
}

export type Fives={
    date:string,
    temp:string,
    icon:number,
    iconPhrase:string
}