export default function convertToCelsius(tempToUpdate) {
  let newCelsiusTemp = tempToUpdate;
  newCelsiusTemp = Math.round((newCelsiusTemp - 32) * (5 / 9));
  return newCelsiusTemp;
}
