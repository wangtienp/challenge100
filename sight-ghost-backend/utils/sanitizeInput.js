import sanitizeHtml from 'sanitize-html'

export function sanitizeInput(data){
    let sanitizeBody={}
    for(const [key,value] of Object.entries(data)){
        if(typeof value === 'string'){
            sanitizeBody[key] = sanitizeHtml(value,{allowedTags:['b'],allowedAttributes:{}})
        }
        else{
            sanitizeBody[key] = value
        }
    }
    return sanitizeBody
}