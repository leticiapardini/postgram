// configuração das nossas requisições api
// instalar o axios;

import axios from 'axios';

interface login {
  email: string
  password: string
}

interface createPost {
  content: string
  userId: number
  date: string
}
interface editPostDados {
  content: string
  userId?: number
  date: string
}
interface register {
  name: string
  email: string
  password: string
}

interface deletePost {
  id: number
  userId: number
  user: number
}

interface editPost {
  id: number
  userId: number
  user: number
  dados?: editPostDados
}
export default class UserServices {
  axios: any;
  constructor() {
    this.axios = axios.create({
      baseURL: "http://localhost:8080/",
    });
  }
  async login(dados: login) {
    const customConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const  ret  = await this.axios.post('/users/login', JSON.stringify(dados), customConfig); 
    if (ret.status === 201) {
      console.log(ret)
    }
    return ret
  }

  async register(dados: register) {
    let variavel = await this.axios.post('/users', dados)
    console.log(variavel)
    return variavel
    
  }

  async logout() {
    localStorage.removeItem('user');
  }

  async createPost(dados: createPost){
    const customConfig = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
    const  ret  = await this.axios.post('/posts', dados, customConfig); 
    return ret;
  }

  async deletePost({id, userId, user} : deletePost) {
    const customConfig = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
    const  ret  = await this.axios.delete(`/posts/${id}/${userId}/${user}`, customConfig); 
    return ret;
  }

  async editPost({id, userId, user, dados} : editPost) {
    const customConfig = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
    const  ret  = await this.axios.put(`/posts/${id}/${userId}/${user}`, dados, customConfig); 
    return ret;
  }

  async getAllPosts() {
    const  ret  = await this.axios.get('/posts'); 
    return ret;
  }

  async getAllUsers() {
    const  ret  = await this.axios.get('/users'); 
    return ret;
  }
}