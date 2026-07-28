import { getData } from "./getData.js";
import fs from 'node:fs/promises'
import path from "node:path";
import sanitizeHtml from 'sanitize-html'
export async function addNewSighting(newSighting) {
    try {
        const sightings = await getData()
        sightings.push(newSighting)
        const dataPath = path.join("data", "data.json")
        await fs.writeFile(dataPath, JSON.stringify(sightings, null, 2), 'utf8')

    } catch (err) {
        throw new Error(`Error happens at add new sighting: ${err}`)
    }
}