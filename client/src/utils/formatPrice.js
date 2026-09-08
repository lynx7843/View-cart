export function formatPrice(price) {
  if (typeof price !== 'number') return null
  return `Rs. ${price.toLocaleString('en-US')}`
}
