"use client";
import { useState, useEffect } from "react";
import styles from "./adminPosts.module.css";
import Link from "next/link";

const AdminPosts = ({posts}) => {
  console.log(posts)
  const [error, setError] = useState(null);


  const handleApprove = async (id) => {
    console.log(id)
    try {
      const response = await fetch('/api/posts/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });
      if (!response.ok) {
        throw new Error('Falha ao aprovar o post');
      }
    } catch (error) {
      console.error('Erro ao aprovar o post:', error);
      setError('Erro ao aprovar o post. Por favor, tente novamente mais tarde.');
    }
  };

  const handleReprove = async (id) => {
    try {
      const response = await fetch('/api/posts/reprove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });
      if (!response.ok) {
        throw new Error('Falha ao reprovar o post');
      }
    } catch (error) {
      console.error('Erro ao reprovar o post:', error);
      setError('Erro ao reprovar o post. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      {posts.map(post => (
        <div className={styles.post} key={post._id}>
          <div className={styles.detail}>
            <span className={styles.postTitle}>
              {post.userId} -- {post._id}
            </span>
          </div>
          <div className={styles.groupButton}>
            <Link className={styles.link} href={`/blog/${post._id}`}>
              <div className={styles.postButton}>Abrir</div>
            </Link>
            {post.pendente ? (
              <div className={styles.actionButtons}>
                <button className={styles.approveButton} onClick={() => handleApprove(post._id)}>Aprovar</button>
                <button className={styles.reproveButton} onClick={() => handleReprove(post._id)}>Reprovar</button>
              </div>
            ) : (
              <>
                {post.aprovado === true && (
                  <div className={styles.approved}>Aprovado</div>
                )}
                {post.aprovado === false && (
                  <div className={styles.reproved}>Reprovado</div>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPosts;
