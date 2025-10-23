import styles from './UserCard.module.scss';
import type { User } from '../types';

import avatarImg from '../../public/bgImg.jpg';
import { useEffect, useRef, useState } from 'react';
export interface UserCardProps {
  user: User;
  onEdit: () => void;
  onArchive: () => void;
  onHide: () => void;
  isArchived?: boolean; 
}


export default function UserCard({ user, onEdit, onArchive, onHide,isArchived = false, }: UserCardProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!dropdownRef.current) return;
      if (!(e.target instanceof Node)) return;
      if (!dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);
  return (
   <div className={`${styles.card} ${isArchived ? styles.archivedCard : ''}`}>
      <img
        src={avatarImg}
        alt={user.username}
        className={styles.avatar}
      />

      <div className={styles.info}>
        <div className={styles.topRow}>
          <div className={styles.username}>{user.username}</div>
          <button
            aria-label="Открыть меню"
            className={styles.menuButton}
            onClick={() => setOpen((s) => !s)}
            type="button"
          >
            ⋮
          </button>
        </div>

        <div className={styles.company}>At-Work</div>
        <div className={styles.city}>{user.address.city}</div>
      </div>

      {open && (
        <div className={styles.dropdownWrapper} ref={dropdownRef}>
          <button
            className={styles.dropdownItem}
            type="button"
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
          >
            Редактировать
          </button>
          <button
            className={styles.dropdownItem}
            type="button"
            onClick={() => {
              setOpen(false);
              onArchive();
            }}
          >
             {isArchived ? 'Разархивировать' : 'Архивировать'}
          </button>
          <button
            className={styles.dropdownItem}
            type="button"
            onClick={() => {
              setOpen(false);
              onHide();
            }}
          >
            Скрыть
          </button>
        </div>
      )}
    </div>
  );
}
