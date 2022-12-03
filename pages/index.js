import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';

import Tweet from '../components/tweet';
import SkeletonTweets from '../components/skeleton-tweets';

import styles from '../styles/Home.module.css'

const googleMapsAPIKey = process.env.GOOGLE_MAPS_API_KEY;

// Criação do componente principal
export default function Home() {
  
  // Criação do estado de endereço, setando o estado inicial como Rio+Grande+RS
  const [address, setAddress] = useState('Rio+Grande+RS');
  
  // Criação do array de tweets, inicialmente vazio, pois ainda não chamou-se a API
  const [tweets, setTweets] = useState([]);

  // Função handler do evento de mudança no input field
  const changeAddressHandler = (event) => {
    // Chama a função de busca com debounce
    debouncedSearch(event.target.value);
  };

  // Função de busca com debounce:
  // A função será chamada com um atraso, ou seja, 
  // só será chamada 300 milissegundos depois que o usuário 
  // parar de digitar na barra de busca
  const debouncedSearch = debounce(async (value) => {
    // Caso o usuário tenha zerado a barra de busca nada é feito
    if (!value) return;

    // Caso o usuário tenha inputado um valor válido, seta-se o novo endereço
    setAddress(value);

    // Em seguida, busca-se os valores de latitude e longitude para o novo endereço
    getGeoLocation(value);
  }, 300);

  // Essa funçao pega a geolocalização dos tweets atraves da rota da api citada abaixo
  // de acordo om o endereço utilizado, são extraidos os dados de latitude e longitude do
  // json e repassados para o metodo getTweets, que ira retornar os tweets esperados
  const getGeoLocation = async (address) => {
    try {
      setTweets([]);
      const url = `https://geo-trending-ds.herokuapp.com/api/forward-geocoding?search=${address}`;
      const res = await fetch(url);
      const { data } = await res.json();
      const { latitude, longitude } = data[0];
      getTweets(latitude, longitude);
    } catch (err) {
      console.log(err);
    }
  }

  // Função de busca dos tweets com base na latitude e longitude
  // obtidas através da API de geolocalização
  const getTweets = async (lat, long) => {
    try {
      const url = `https://geo-trending-ds.herokuapp.com/api/get-tweets?lat=${lat}&long=${long}`;
      const res = await fetch(url);
      const response = await res.json();
      setTweets(response.statuses);
    } catch (err) {
      console.log(err);
    }
  };

  // Hook do react para fazer a primeira busca por endereço
  // Essa busca só será realizada uma única vez no load da aplicação
  // A busca será realizada com base no endereço padrão (Rio+Grande+RS)
  // O ponto de entrada das demais buscas é a função changeAddressHandler
  useEffect(() => {
    getGeoLocation(address);
  }, []);

  // O retorno do componente é um objeto JSX que será renderizado em tela
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        {/* Definição do header principal da página */}
        <h1 className={styles.title}>Geo Trending 🌍</h1>

        {/* Nesse trecho é criada a barra de busca. Através dela, o usuário pode inserir o endereço desejado */}
        <input
          className={styles.search}
          type='text'
          placeholder='Busque tweets perto de você'
          onChange={changeAddressHandler}/>

        {/* Utilização da API Maps Embed da Google para exibir no mapa o endereço inputado pelo usuário*/}
        <iframe
          className={styles.map}
          height='450'
          loading='lazy'
          allowFullScreen
          referrerPolicy='no-referrer-when-downgrade'
          src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsAPIKey}&q=${address}`}/>
      </div>
      <div className={styles.column}>
        {/* Aqui é feita a validação do vetor tweets. Caso ele esteja vazio, mostra-se a tela de carregamento */}
        {/* Caso contrário, renderiza-se os tweets */}
        { tweets.length === 0 
          // Nesse trecho é renderiza a tela de carregamento
          ? <SkeletonTweets/>
          // Nesse trecho é feita a renderização dos tweets carregados através da API
          // Utiliza-se um componente personalizado Tweet, que pode ser encontrado em components/tweet
          : tweets.map((el) => <Tweet key={el.id} data={el}/>) 
        }
      </div>
    </div>
  );
}
