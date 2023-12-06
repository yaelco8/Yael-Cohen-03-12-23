export function convrtF(f: number){
    const res = (f - 32) * 5 / 9
    return res.toFixed(0)
}