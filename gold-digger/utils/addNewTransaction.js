import { getData } from "./getData.js";
import fs from 'node:fs/promises'
import path from "node:path";
export async function addNewTransaction(transaction) {
    const transactions = await getData()
    transactions.push(transaction)
    const dataPath = path.join('data', "transactionHistory.json")
    await fs.writeFile(dataPath, JSON.stringify(transactions, null, 2), 'utf-8')
}