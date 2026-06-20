// insert your key
export const baseUrl =`https://api.exchangerate.host/`

export async function http(){
    let res = await fetch(`${baseUrl}convert?access_key=${key}&from=${from}&to=${to}&amount=1`)
    if(!res.ok){
        throw new Error(res.statusText)
    }
    const data = await res.json()
    return data
}
