// Como a data vem da api em um formato não muito legível
// Então, é preciso fazer a conversão para algo mais amigável ao usuário

// Esse hashmap mapeia os meses para números
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
  
// Essa função formata a data, alterando as posições do array para manter o padrão ano-mes-dia
const getDate = (arr) => {
  return  arr[arr.length - 1] + '-' + charMap.get(arr[1]) + '-' + arr[2];
}
  
// Essa função retorna apenas o horario do tweet
const getTime = (arr) => {
  return arr[3];
}

// Como o nome da função indica, aqui é feita a conversão da data
// Constrói-se um objeto Date a partir de uma timestamp formada pela data e o tempo
// além da informação de fuso horário, no caso GMT (+00:00)
  const formatTimestampToDateAndTime = (timestamp) => {
    const arr = timestamp.split(' ');
    const dateStr = getDate(arr);
    const time = getTime(arr);
    const date = new Date(`${dateStr}T${time}.000+00:00`);
    
    // aqui, utiliza-se uma função nativa do JS para converter a data gerada
    // para um formato mais legível ao usuário
    // escolhemos o locale pt-BR e também fazemos a conversão para a timezone
    // de São Paulo, visto que a API retorna em GMT (Londres)
    return date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  }
  
  export { formatTimestampToDateAndTime };