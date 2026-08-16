const eventSource = new EventSource("/api/gold-price")
const livePriceInput = document.querySelector("#live-price")
let livePrice, downloadLink
eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    const price = data.price
    livePrice = price
    livePriceInput.value = `₹ ${livePrice} / gram`
}
eventSource.onerror = () => {
    console.log("Cannot get the price")
}
const summaryText = document.querySelector("#summary-text")
const amountInput = document.querySelector("#amount-invest")
const submitButton = document.querySelector("#submit-button")
const form = document.querySelector("form")
const dialog = document.querySelector("#dialog")
const closeDialogBtn = document.querySelector("#close-dialog-btn")
const downloadReceiptBtn = document.querySelector("#download-receipt-btn")
form.addEventListener("submit", async (event) => {
    event.preventDefault()
    await postForm()
    
})
closeDialogBtn.addEventListener('click', () => { dialog.close() })

async function postForm() {
    const totalAmount = parseFloat(amountInput.value)
    const gramBought = (totalAmount / livePrice).toFixed(3)
    if(totalAmount<0){
        window.alert("Invalid amount, please retry.")
        return
    }
    const formData = {
        uuid: crypto.randomUUID(),
        amount: totalAmount.toFixed(2),
        price_per_gram: livePrice.toFixed(2),
        grams_bought: gramBought
    }
    
    summaryText.textContent = `You just bought ${gramBought} Gram Digital Gold for ₹${totalAmount}. You will receive documentation shortly.`

    dialog.showModal()
    try {
        const response = await fetch("/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        if (!response.ok) {
            console.log("Your submit fail due to ", response.status)
        }
        else {
            const blob = await response.blob()
            const downloadURL = window.URL.createObjectURL(blob)
            downloadLink = downloadURL
            console.log(downloadURL)
            console.log(blob)
        }
    } catch (err) {
        throw new Error(`Error: ${err}`)
    }
}
downloadReceiptBtn.addEventListener('click', () => {
    if (downloadLink) {
        const a = document.createElement('a')
        a.href = downloadLink;
        a.download = 'receipt.pdf';
        a.click();
    }
    else{
        console.log("Not yet ready")
    }
})