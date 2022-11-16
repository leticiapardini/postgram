import axios from "axios";
import {
  createPost,
  deletePost,
  editPost,
  login,
  register,
} from "../types/interfaces";

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
        "Content-Type": "application/json",
      },
    };

    const ret = await this.axios.post(
      "/users/login",
      JSON.stringify(dados),
      customConfig
    );
    return ret;
  }

  async register(dados: register) {
    let ret = await this.axios.post("/users", dados);
    return ret;
  }

  async logout() {
    localStorage.removeItem("user");
  }

  async createPost(dados: createPost) {
    const customConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const ret = await this.axios.post("/posts", dados, customConfig);
    return ret;
  }

  async deletePost({ id, userId, user }: deletePost) {
    const customConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const ret = await this.axios.delete(
      `/posts/${id}/${userId}/${user}`,
      customConfig
    );
    return ret;
  }

  async editPost({ id, userId, user, dados }: editPost) {
    const customConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const ret = await this.axios.put(
      `/posts/${id}/${userId}/${user}`,
      dados,
      customConfig
    );
    return ret;
  }

  async getAllPosts() {
    const ret = await this.axios.get("/posts");
    return ret;
  }

  async getAllUsers() {
    const ret = await this.axios.get("/users");
    return ret;
  }
}
