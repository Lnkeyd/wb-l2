export function convertDateTime(ms) {
  const date = new Date(ms * 1000);

  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();

  // Время в формате 10:30:23
  const formattedTime =
    date.toLocaleDateString() + " " + hours + ":" + minutes.substr(-2);

  return formattedTime;
}