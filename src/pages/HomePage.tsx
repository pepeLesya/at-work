import { useEffect } from "react";
import { useUsers } from "../api/useUsers";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import UserCard from '../components/UserCard'
import Layout from '../components/Layout';
import styles from '../styles/main.module.scss' 

function HomePage() {
  const { data, isLoading, error } = useUsers();
  const {
    activeUsers,
    setInitialUsers,
    archiveUser,
    archivedUsers,
    hideUser,
    unarchiveUser,
  } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (data && activeUsers.length === 0) {
      setInitialUsers(data);
    }
  }, [data, activeUsers.length, setInitialUsers]);

  if (isLoading || (data && activeUsers.length === 0)) {
    return <div>Загрузка...</div>;
  }
  if (error) {
    return <div>Ошибка загрузки</div>;
  }

  console.log(data);
  return (
     <Layout>
      <h2 className={styles.sectionTitle}>Активные</h2>
      <div className={styles.grid}>
        {activeUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={() => navigate(`/edit/${user.id}`)}
            onArchive={() => archiveUser(user.id)}
            onHide={() => hideUser(user.id)}
             isArchived={false}
          />
        ))}
      </div>

      <h2 className={styles.sectionTitle}>Архив</h2>
      <div className={styles.grid}>
        {archivedUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={() => navigate(`/edit/${user.id}`)}
            onArchive={() => unarchiveUser(user.id)}
            onHide={() => hideUser(user.id)}
             isArchived={true}
          />
        ))}
      </div>
    </Layout>
  );
}

export default HomePage;
