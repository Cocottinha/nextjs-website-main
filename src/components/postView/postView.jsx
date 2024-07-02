"use client"
import { useState, useEffect } from "react";
import styles from "./postView.module.css";
import PostUser from "../postUser/postUser";
import { getUserName } from "@/lib/data";

const PostView = ({ post }) => {
  const [username, setUsername] = useState("");

  let statusMessage = "";
  if (post.aprovado) {
    statusMessage = "Aprovado";
  } else if (post.reprovado) {
    statusMessage = "Reprovado";
  } else {
    statusMessage = "Pendente";
  }

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const username = await getUserName(post.userId);
        setUsername(username);
      } catch (error) {
        console.error("Failed to fetch username:", error);
        setUsername(post.userId);
      }
    };

    fetchUserName();
  }, [post.userId]);

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Id Hora: {post._id}</h1>
        <div className={styles.detail}>
          <PostUser userId={post.userId} username={username} />
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Data da Publicação</span>
            <span className={styles.detailValue}>{post.createdAt.toString().slice(0, 10)}</span>
          </div>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Status</span>
            <span className={styles.detailValue}>{statusMessage}</span>
          </div>
        </div>
        <div className={styles.contTop}>
          <div className={styles.text}>Dimensão: {post.dimensao}</div>
          <div className={styles.text}>Atividade: {post.atividade}</div>
          <div className={styles.text}>Horas: {post.horas}</div>
          <div className={styles.text}>Descrição: {post.descricao}</div>
        </div>
      </div>

    </div>
  );
};

export default PostView;
