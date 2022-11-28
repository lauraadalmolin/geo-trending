import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';

import { AiFillHeart, AiOutlineRetweet } from 'react-icons/ai';
import styles from '../styles/Home.module.css'

import config from '../config.json';

import { formatTimestampToDateAndTime } from '../utils/strings';

export default function Home() {
  const [address, setAddress] = useState('Rio+Grande+RS');
  const [tweets, setTweets] = useState([]);

  const debouncedSearch = debounce((value) => {
    setAddress(value);
    getGeoLocation(value);
  }, 1000);

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

  const getTweets = async (lat, long) => {
    try {
      const url = `http://localhost:3000/api/get-tweets?lat=${lat}&long=${long}`;
      const res = await fetch(url);
      const response = await res.json();
      console.log(response);
      setTweets(response.statuses);
    } catch (err) {
      console.log(err);
    }
  };

  const changeAddressHandler = (event) => {
    debouncedSearch(event.target.value);
  };

  // const time = (duration) => {
  //   var MyOffset = (duration.getTimezoneOffset())/-60;
  //   console.log(MyOffset);
  // }
  
  // function convertDateToUTC(date) { 
  //   return new Date(
  //     date.getUTCFullYear(),
  //     date.getUTCMonth(),
  //     date.getUTCDate(),
  //     date.getUTCHours(),
  //     date.getUTCMinutes(),
  //     date.getUTCSeconds()); 
  //   }

  useEffect(() => {
    getGeoLocation(address);
  }, [address]);

  return (
    <div className={styles.all}>
        <div className={styles.container}>
        <input className={styles.search} type='text' placeholder="  Busque tweets perto de você" onChange={changeAddressHandler}>
        </input>
        <iframe
          className={styles.map}
          height='450'
          loading='lazy'
          allowFullScreen
          referrerPolicy='no-referrer-when-downgrade'
          src={`https://www.google.com/maps/embed/v1/place?key=${
            config.googleMapsAPIKey
          }&q=${address || 'Brasil'}`}
        />
        </div>
          <div className={styles.container}>
            { tweets.map(el => {
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
                      <p className={styles.date}>{formatTimestampToDateAndTime(el.created_at)}</p>
                    </div>
                  </div>
                );
              })
            }
          </div>
    </div>
  );
}
