import styles from "../styles/sidebar.module.css";
import UserServices from "../services/services";
import { useNavigate } from "react-router-dom";
import { userProps } from "../types/interfaces";

const userService = new UserServices();

export function Sidebar({ user }: userProps) {
  const navigate = useNavigate();

  const logout = () => {
    userService.logout();
    navigate("/login");
  };

  return (
    <>
      <aside className={styles.sidebar}>
        <img
          className={styles.cover}
          src="https://i.pinimg.com/236x/a1/75/4f/a1754fe7952721f74d5fd2dd565f5013.jpg"
          alt="Imagem do card de perfil"
        />
        <div className={styles.profile}>
          <img
            className={styles.avatarWithBorder}
            src="https://lead.umn.edu/sites/lead.umn.edu/files/2020-04/default-user-icon.jpg"
          />
          <strong>
            {user.length > 0 ? user[0].name.toUpperCase() : "name"}
          </strong>
        </div>
        <footer>
          <div>
            <button onClick={logout} className={styles.buttonStyle}>
              Sair
            </button>
          </div>
        </footer>
      </aside>
    </>
  );
}
