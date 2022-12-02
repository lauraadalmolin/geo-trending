import styles from './style.module.css';

// Componente responsável por exibir os esqueletos de tweets
// quando estiver ocorrendo o processo de carregamento.
// Trata-se de um HTML + CSS simples que provoca essa sensação 
// de carregamento ao usuário
const SkeletonTweets = () => {
  const repeat = Array.from(Array(10).keys());
  return (
    <div>
      { repeat.map((el) => (
        <div className={`${styles.tweet}`} key={el}>
          <div className={styles.userInfo}>
            <div className={styles.profilePic}></div>
            <div className={styles.userName}></div>
            <div className={styles.userScreenName}></div>
          </div>
          <p className={styles.tweetText}></p>
          <div className={styles.interactions}>
            <div className={styles.interaction}></div>
            <div className={styles.interaction}></div>
            <p className={styles.date}></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonTweets;
