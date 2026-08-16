const url = "https://api.waifu.im/images?PageSize=30&Page=1"
const imgUrl = "https://api.waifu.im/images/"
export async function getGalleryImg(IsNsfw){
    const res = await fetch(`${url}&IsNsfw=${IsNsfw}&IsAnimated=True`)
    if(!res.ok){
        throw new Error(res.statusText)
    }
    const data = await res.json()
    return data
}
export async function getImage(id){
    const res = await fetch(`${imgUrl}${id}`)
    if(!res.ok){
        throw new Error(res.statusText)
    }
    const data = await res.json()
    console.log(data)
    return data
}