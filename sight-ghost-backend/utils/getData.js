import path from 'node:path'
import fs from 'node:fs/promises'

export async function getData() {

    try {
        const dataPath = path.join('data', 'data.json')
        const dataContent = await fs.readFile(dataPath,'utf-8')
        const parsedData = JSON.parse(dataContent)
        return parsedData

    } catch (err) {
        console.log(err)
        return []
    }

}