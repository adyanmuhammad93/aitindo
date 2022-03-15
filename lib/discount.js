export default function discountPercentage(price, specialPrice) {
  return `${100 - Math.ceil((specialPrice / price) * 100)}%`
}