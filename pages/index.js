import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';

import { AiFillHeart, AiOutlineRetweet } from 'react-icons/ai';
import styles from '../styles/Home.module.css'

import config from '../config.json';

import { formatTimestampToDateAndTime } from '../utils/strings';

//aqui é chamada a função principal, utilizando como localizaçao default a cidade de Rio Grande
export default function Home() {
  const [address, setAddress] = useState('Rio+Grande+RS');
  const [tweets, setTweets] = useState([]);

  const debouncedSearch = debounce(async (value) => {
    if (!value) return;
    setAddress(value);
    getGeoLocation(value);
  }, 300);

  //Essa funçao pega a geolocalização dos tweets atraves da rota da api citada abaixo
  //de acordo om o endereço utilizado, são extraidos os dados de latitude e longitude do
  //json e repassados para o metodo getTweets, que ira retornar os tweets esperados
  const getGeoLocation = async (address) => {
    try {
      const url = `http://localhost:3000/api/forward-geocoding?search=${address}`;
      const res = await fetch(url);
      const { data } = await res.json();
      const { latitude, longitude } = data[0];
      getTweets(latitude, longitude);
    } catch (err) {
      console.log(err);
    }
  }

  // como citado anteriormente, essa função é responsavel por retornar os tweets, quando
  //passadas as informações de longitude e latitude
  const getTweets = async (lat, long) => {
    try {
      const url = `http://localhost:3000/api/get-tweets?lat=${lat}&long=${long}`;
      const res = await fetch(url);
      const response = await res.json();
      setTweets(response.statuses);
    } catch (err) {
      console.log(err);
    }
  };

  const changeAddressHandler = (event) => {
    debouncedSearch(event.target.value);
  };

  useEffect(() => {
    getGeoLocation(address);
  }, []);

  //Nesse trecho do codigo é definido o front-end da pagina
  return (
    <div className={styles.container}>
      {/* Nesse trecho é definido a barra de busca, onde sera inserido pelo usuario a cidade desejada */}
      <div className={styles.column}>
        <h1 className={styles.title}>Geo Trending 🌍</h1>
        <input
          className={styles.search}
          type='text'
          placeholder='Busque tweets perto de você'
          onChange={changeAddressHandler}
        ></input>
        <iframe
          // aqui é definido o mapa, deixando como default a regiao do Brasil
          className={styles.map}
          height='450'
          loading='lazy'
          allowFullScreen
          referrerPolicy='no-referrer-when-downgrade'
          src={`https://www.google.com/maps/embed/v1/place?key=${config.googleMapsAPIKey}&q=${address}`}
        />
      </div>
      <div className={styles.column}>
        {/* Nesse trecho é feito o mapeamento e retorno dos 10 ultimos tweets dessa região */}
        {/* Trazendo o nome du usuario, nome, imagem de perfil, o conteudo da mensagem e a hora */}
        {tweets.map((el) => {
          return (
            <div className={styles.tweet} key={el.id}>
              <div className={styles.userInfo}>
                <img
                  className={styles.profilePic}
                  src={el.user.profile_image_url}
                />
                <span className={styles.userName}>{el.user.name}</span>
                <span className={styles.userScreenName}>
                  @{el.user.screen_name}
                </span>
              </div>
              <p className={styles.tweetText}>{el.text}</p>
              <div className={styles.interactions}>
                <span className={styles.interaction}>
                  <AiOutlineRetweet className={styles.icon} />{' '}
                  {el.retweet_count}
                </span>
                <span className={styles.interaction}>
                  <AiFillHeart className={styles.icon} /> {el.favorite_count}
                </span>
                <p className={styles.date}>
                  {formatTimestampToDateAndTime(el.created_at)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
