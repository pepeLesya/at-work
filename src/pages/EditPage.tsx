import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "../store/useUserStore";
import { userSchema, type UserFormData } from "../lib/validation/userSchema";
import SuccessPopup from "../components/SuccessPopup";
import styles from '../components/EditPage.module.scss';
import avatarImg from '../../public/bgImg.jpg';
import Layout from '../components/Layout';

function EditPage() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const { activeUsers, archivedUsers, updateUser } = useUserStore();
  const user = [...activeUsers, ...archivedUsers].find((u) => u.id === userId);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        username: user.username,
        email: user.email,
        city: user.address.city,
        phone: user.phone,
        companyName: user.company.name,
      });
    }
  }, [user, reset]);

  const onSubmit = (data: UserFormData) => {
    updateUser(userId, {
      name: data.name,
      username: data.username,
      email: data.email,
      phone: data.phone,
      address: { city: data.city },
      company: { name: data.companyName },
    });
    setShowPopup(true);
  };

  if (!user) return null;

  return (
    <Layout>
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <img
           src={avatarImg}
          alt={user.username}
          className={styles.avatar}
        />
        <div className={styles.profileInfo}>
          <div className={styles.username}>{user.username}</div>
          <div className={styles.company}>At-Work</div>
        </div>
        <nav className={styles.menu}>
          <div className={`${styles.menuItem} ${styles.active}`}>Данные профиля</div>
          <div className={styles.menuItem}>Рабочее пространство</div>
          <div className={styles.menuItem}>Приватность</div>
          <div className={styles.menuItem}>Безопасность</div>
        </nav>
      </aside>

      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>Данные профиля</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {[
            { name: "name", label: "Имя" },
            { name: "username", label: "Никнейм" },
            { name: "email", label: "Почта" },
            { name: "city", label: "Город" },
            { name: "phone", label: "Телефон" },
            { name: "companyName", label: "Название компании" },
          ].map(({ name, label }) => (
            <div key={name} className={styles.formField}>
              <label>{label}</label>
              <input {...register(name as keyof UserFormData)} />
              {errors[name as keyof UserFormData] && (
                <p className={styles.error}>
                  {errors[name as keyof UserFormData]?.message}
                </p>
              )}
            </div>
          ))}
          <button type="submit" className={styles.saveButton}>
            Сохранить
          </button>
        </form>
      </div>

      {showPopup && <SuccessPopup onClose={() => setShowPopup(false)} />}
    </div>
    </Layout>

  );
}

export default EditPage;
