import hero from '../assets/images/hero.webp';
import styles from './styles.module.css';

const backgroundImage = {
  background: `url(${hero}) center/cover no-repeat`,
};

export default function Overlay({ children }) {
  return (
    <div className={styles.container} style={backgroundImage}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
