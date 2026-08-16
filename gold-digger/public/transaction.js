try {
    const response = await fetch("/api")
    if (!response.ok) {
        console.log(response.status)
    }
    const data = await response.json()
    displayTransaction(data)
} catch (err) {
    throw new Error(`Error: ${err}`)
}

function displayTransaction(transactions) {
    
    const bodyRow = document.querySelector("tbody")
    let body=""
    if (transactions.length > 0) {
        for (const transaction of transactions) {
            body += `
            <tr>
                <td>${transaction["amount"]}</td>
                <td>${transaction["price_per_gram"]}</td>
                <td>${transaction["grams_bought"]}</td>
            </tr>
            `
        }
        bodyRow.innerHTML = body
    }
}