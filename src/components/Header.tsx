import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

export default function Header() {
     const navigate = useNavigate();
      const goToUsers = () => {
    navigate('/'); 
  };
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <button className={styles.logoButton} onClick={goToUsers}>
        <img src="/logo-sign.svg" alt="Logo" />
        <span>at-work</span>
        </button>
      </div>
      <div className={styles.controls}>
        <button className={styles.iconButton}>
          <span><img src="/heart.svg" alt="like" /></span>
        </button>
        <button className={styles.iconButton}>
          <span><img src="/ring.svg" alt="ring" /></span>
        </button>
        <div className={styles.user}>
          <img src="/bgImg.jpg" alt="User"/>
          <span>Ivan1234</span>
        </div>
      </div>
    </header>
  );
}