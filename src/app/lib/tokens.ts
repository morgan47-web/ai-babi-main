export function displayTokenAmount(price?: number): string {
  if (price === undefined) return ""
  const decimalPart = price % 10
  if (decimalPart === 0) {
    return (price / 10).toFixed(0)
  }
  return (price / 10).toFixed(1)
}
