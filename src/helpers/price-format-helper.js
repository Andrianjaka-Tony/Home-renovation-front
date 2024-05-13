export function formatPrice(price = 0) {
  return price
    .toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })
    .substring(1);
}
