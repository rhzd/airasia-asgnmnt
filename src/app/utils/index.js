function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function dateToNumber(date) {
  return new Date(date).getTime();
}

module.exports = { capitalize, dateToNumber };
