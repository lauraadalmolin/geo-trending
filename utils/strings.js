//como a data vem da api no formato GMT é preciso fazer a conversão

//essa constante faz o mapeamento para converter os meses de nome para numero
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
  
  //essa função formata a data, alterando as posições do array para manter o padrao do Brasil dia-mes-ano
  const getDate = (arr) => {
    return  arr[arr.length - 1] + '-' + charMap.get(arr[1]) + '-' + arr[2];
  }
  
  //essa função retorna apenas o horario do tweet
  const getTime = (arr) => {
    return arr[3];
  }

//como o nome da função indica, aqui é feita a conversão da data
//pegando data e tempo das funções e unindo
// após isso é definido o pais e zona, nesse caso Brasil, Sao Paulo  
  const formatTimestampToDateAndTime = (timestamp) => {
    const arr = timestamp.split(' ');
    const dateStr = getDate(arr);
    const time = getTime(arr);
    const date = new Date(`${dateStr}T${time}.000+00:00`);
  
    return date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  }
  
  export { formatTimestampToDateAndTime };