export const getDataFunction = () => {
  const newData = new Date();
  const day = newData.getDate();
  const month = newData.getMonth() + 1;
  const year = newData.getFullYear();
  return day + '/' + (month < 10 ? '0' : '') + month + '/' + year;
}
