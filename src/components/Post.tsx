import React, { useState } from "react";
import styles from "../styles/post.module.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";
import UserServices from "../services/services";
import { getPost, getUsers } from "../types/interfaces";


const userService = new UserServices();
export const Post = ({
  id,
  content,
  date,
  userId,
  name,
  user,
  getAllPosts,
}: getPost) => {
  const [error, setErro] = useState("");
  const [contentEdit, setContentEdit] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const newDate = new Date().toISOString();
  const handleDelete = async () => {
    try {
      const reponse = await userService.deletePost({
        id,
        userId,
        user: user[0].id,
      });
      if (reponse.status === 200) {
        getAllPosts();
      }
    } catch (error: any) {
      setErro(error.response.data.message);
    }
  };

  const handleEdit = async () => {
    try {
      setIsModalOpen(false);
      const response = await userService.editPost({
        id,
        userId,
        user: user[0].id,
        dados: { content: contentEdit, date: newDate },
      });
      if (response.status === 200) {
        getAllPosts();
      }
    } catch (error: any) {
      setErro(error.response.data.message);
    }
  };

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <img
            src="https://lead.umn.edu/sites/lead.umn.edu/files/2020-04/default-user-icon.jpg"
            className={styles.avatar}
          />
          <div className={styles.authorInfo}>
            <strong>{name.toUpperCase()}</strong>
          </div>
        </div>
        <time>
          {` ${formatRelative(new Date(date), new Date(), {
            locale: ptBR,
          })}`}
        </time>
      </header>

      <div className={styles.content}>
        <label>{content}</label>
      </div>
      <div>
        <button onClick={handleDelete} className={styles.iconDelete}>
          <DeleteOutlined />
        </button>
        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className={styles.iconEdit}
        >
          <EditOutlined />
        </button>
      </div>
      <div className={styles.error}>{error}</div>
      <div className={styles.error}>
        {isModalOpen && (
          <div>
            <input
              onChange={(e) => setContentEdit(e.target.value)}
              className={styles.inputEdit}
              type="text"
              placeholder="Edite seu post..."
            />
            <button onClick={handleEdit} className={styles.buttonEdit}>
              Enviar
            </button>
          </div>
        )}
      </div>
    </article>
  );
};
