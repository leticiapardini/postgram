import React, { useContext, useState } from "react";
import styles from "../styles/sidebar.module.css";
import UserServices from "../services/services";
import { useNavigate } from "react-router-dom";

const userService = new UserServices();

export function Sidebar() {

  const navigate = useNavigate()
  
  const logaut = () => {
    userService.logout();
    navigate('/login')
  }
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
          <strong>Leticia Pardini</strong>
        </div>
        <footer>
        <div>
          <button onClick={logaut} className={styles.buttonStyle}>Sair</button>
        </div>
        </footer>
      </aside>
    </>
  );
}
