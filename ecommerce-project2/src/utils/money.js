export function formatMoney(amountCents) {
  const toDollar = (amountCents/100).toFixed(2)
  if(amountCents <0)return `${toDollar[0]}$${toDollar.slice(1)}`
  return `$${toDollar}`
}