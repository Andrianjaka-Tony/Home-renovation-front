export function formatTimestamp(timestamp) {
  const d = new Date(timestamp);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return d.toLocaleString("fr-FR", options);
}

export function formatDate(date) {
  const d = new Date(date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return d.toLocaleString("fr-FR", options);
}
