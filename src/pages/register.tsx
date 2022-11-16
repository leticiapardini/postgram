import { FormEvent, useState } from 'react';
import styles from '../styles/register.module.css';
import UserServices from '../services/services';
import { Link } from 'react-router-dom';

const useService = new UserServices();

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e : FormEvent) => {
    e.preventDefault();
    try {
      const response = await useService.register({ name, email, password})
      console.log(response, response)
    } catch (error: any) {
      setErro(error.response.data.message)
    }
  }
  console.log(name, email,password)
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p className={styles.one}>Bem vindo</p>
        <p className={styles.two}>ao</p>
        <p className={styles.tree}>POSTGRAM!!</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.titleRegister}>Cadastre-se</p>
        <input onChange={(e) => setName(e.target.value)} 
        type="text" name="name" id="name" placeholder='Digite seu nome ...'/>
        <input onChange={(e) => setEmail(e.target.value)} 
        type="email" name="email" id="email" placeholder='Digite seu e-mail ...' />
        <input onChange={(e) => setPassword(e.target.value)} 
        type="password" name="password" id="password" placeholder='Digite sua senha ...'/>
        {erro.length > 0 && <p className={styles.erro}>{erro}</p>}
        <button className={styles.button} type="submit">Cadastrar</button>
        <p className={styles.login}>Já possui cadastro ? <Link to={"/login"} 
        className={styles.link}> Clique aqui para ir para o Login</Link></p>
      </form>
    </div>
  )
}