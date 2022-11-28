
const charMap = new Map([
  ['Jan', 1],
  ['Feb', 2],
  ['Mar', 3],
  ['Apr', 4],
  ['May', 5],
  ['Jun', 6],
  ['Jul', 7],
  ['Aug', 8],
  ['Sep', 9],
  ['Oct', 10],
  ['Nov', 11],
  ['Dec', 12],
]);

const getDate = (arr) => {
  return  arr[arr.length - 1] + '-' + charMap.get(arr[1]) + '-' + arr[2];
}

const getTime = (arr) => {
  return arr[3];
}

const formatTimestampToDateAndTime = (timestamp) => {
  const arr = timestamp.split(' ');
  const dateStr = getDate(arr);
  const time = getTime(arr);
  const date = new Date(`${dateStr}T${time}.000+00:00`);
  
  return date.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' });
}

export { formatTimestampToDateAndTime };