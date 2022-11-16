import React, { FormEvent, useEffect, useState } from "react";
import { Post } from "../components/Post";
import { Sidebar } from "../components/SideBar";
import styles from "../styles/home.module.css";
import UserServices from "../services/services";
import { getPosts, getUsers } from "../types/interfaces";


const useService = new UserServices();

export const Home = () => {
  const [posts, setPosts] = useState<getPosts[]>([]);
  const [users, setUsers] = useState<getUsers[]>([]);
  const [content, setContent] = useState("");
  const [erro, setErro] = useState("");

  const user = localStorage.getItem("user");
  const date = new Date().toISOString();
  const userActive = users.filter((id) => id.email === user);
  let userId = 0;

  if (userActive.length > 0) {
    userId = userActive[0].id;
  }

  const getAllPosts = async () => {
    const getPosts = await useService.getAllPosts();
    setPosts(getPosts.data);
  };
  const getAllUsers = async () => {
    const getUsers = await useService.getAllUsers();
    setUsers(getUsers.data);
  };

  useEffect(() => {
    getAllUsers();
    getAllPosts();
  }, []);
 
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await useService.createPost({ content, date, userId });
      if (response.status === 201) {
        getAllPosts();
        setContent("");
      }
    } catch (error) {
      setErro("Não foi possivel criar seu post, tente novamente");
    }
  };

  return (
    <div className={styles.wrapper}>
      <Sidebar user={userActive} />
      <main>
        <div className={styles.Post}>
          <form onSubmit={handleSubmit} className={styles.commentForm}>
            <strong> Digite seu novo Post</strong>
            <textarea
              name="post"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escreva seu post"
              required
            />
            <footer>
              <button type="submit">Publicar</button>
            </footer>
            {erro && <p style={{ color: "red" }}>{erro}</p>}
          </form>
        </div>
      </main>
      <div className={styles.container}>
        {posts.length > 0 && posts.map((post) => (
          <div key={post.id}>
            <Post
              getAllPosts={getAllPosts}
              id={post.id}
              user={userActive}
              content={post.content}
              date={post.date}
              userId={post.user.id}
              name={post.user.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
