import path from 'node:path'
import fs from 'node:fs/promises'
export async function getData() {
    try{
        const dataPath = path.join('data','transactionHistory.json')
        const content = await fs.readFile(dataPath,'utf-8')
        const parsedData = JSON.parse(content)
        return parsedData
    }catch(err){
        return []
    }

}