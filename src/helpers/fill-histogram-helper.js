const numbers = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const months = [
  "Janvier",
  "Fevrier",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novombre",
  "Decembre",
];

export default function fillHistogram(histogram = []) {
  return numbers.map((number, index) => {
    const month = months[index];
    const filter = histogram.filter(({ date }) => date.endsWith(number));
    let value = 0;
    if (filter.length == 1) {
      value = filter[0].price;
    }
    return { price: value, date: month };
  });
}
