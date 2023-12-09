export function convrtF(f: number){
    const res = (f - 32) * 5 / 9
    return res.toFixed(0)
}

export function convertC(c:number){
    const res=c*(9/5)+32
    return res.toFixed(0)
}