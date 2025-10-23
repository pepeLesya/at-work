import { useEffect } from 'react';
import styles from './SuccessPopup.module.scss';

interface SuccessPopupProps {
  onClose: () => void;
}

export default function SuccessPopup({ onClose }: SuccessPopupProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          ×
        </button>
        <div className={styles.icon}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <p>Данные успешно сохранены!</p>
      </div>
    </div>
  );
}
