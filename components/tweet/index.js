import { AiFillHeart, AiOutlineRetweet } from 'react-icons/ai';

import { formatTimestampToDateAndTime } from '../../utils/strings';

import styles from './style.module.css';

// Componente responsável pelo layout dos tweets
// Exibe a imagem, nome do usuário, username, texto, data, hora e interações
const Tweet = ({ data }) => {
  return (
    <div className={styles.tweet}>
      <div className={styles.userInfo}>
        <img className={styles.profilePic} src={data.user.profile_image_url} />
        <span className={styles.userName}>{data.user.name}</span>
        <span className={styles.userScreenName}>@{data.user.screen_name}</span>
      </div>
      <p className={styles.tweetText}>{data.text}</p>
      <div className={styles.interactions}>
        <span className={styles.interaction}>
          <AiOutlineRetweet className={styles.icon} /> {data.retweet_count}
        </span>
        <span className={styles.interaction}>
          <AiFillHeart className={styles.icon} /> {data.favorite_count}
        </span>
        <p className={styles.date}>
          {formatTimestampToDateAndTime(data.created_at)}
        </p>
      </div>
    </div>
  );
};

export default Tweet;
