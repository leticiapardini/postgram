import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserServices from "../services/services";
import styles from "../styles/login.module.css";

const useService = new UserServices();

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await useService.login({ email, password });
      if (response.status === 200) {
        navigate("/home");
        localStorage.setItem("user", email);
      }
    } catch (error: any) {
      setErro("Email or password incorrect");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p className={styles.one}>Bem vindo</p>
        <p className={styles.two}>ao</p>
        <p className={styles.tree}>POSTGRAM!!</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.titleRegister}>Login</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          id="email"
          placeholder="Digite seu e-mail ..."
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          id="password"
          placeholder="Digite sua senha ..."
        />
        {erro.length > 0 && <p className={styles.erro}>{erro}</p>}
        <button className={styles.button} type="submit">
          Login
        </button>
        <p className={styles.login}>
          <Link to={"/"} className={styles.link}>
            {" "}
            Clique aqui para ir para o Cadastro
          </Link>
        </p>
      </form>
    </div>
  );
};
