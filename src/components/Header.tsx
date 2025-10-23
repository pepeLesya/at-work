import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

export default function Header() {
  const navigate = useNavigate();

  const goToUsers = () => {
    navigate('/');
  };

  const base = import.meta.env.BASE_URL; 

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <button className={styles.logoButton} onClick={goToUsers}>
          <img src={`${base}logo-sign.svg`} alt="Logo" />
          <span className={styles.logoText}>
            <span className={styles.at}>at-</span>
            <span className={styles.work}>work</span>
          </span>
        </button>
      </div>
      <div className={styles.controls}>
        <button className={styles.iconButton}>
          <span><img src={`${base}heart.svg`} alt="like" /></span>
        </button>
        <button className={styles.iconButton}>
          <span><img src={`${base}ring.svg`} alt="ring" /></span>
        </button>
        <div className={styles.user}>
          <img src={`${base}bgImg.jpg`} alt="User"/>
          <span>Ivan1234</span>
        </div>
      </div>
    </header>
  );
}
