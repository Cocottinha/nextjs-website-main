"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./postCard.module.css";
import Link from "next/link";

const PostCard = ({ post }) => {
  const [imageSrc, setImageSrc] = useState(`/ftp/${post.projeto_id}/${post.nome_imagem}${post.extensao_imagem}`);
  const [imgError, setImgError] = useState(false);

  const handleImgError = () => {
    setImgError(true);
    setImageSrc(`/ftp/notfound.png`);
  };

  useEffect(() => {
    setImageSrc(`/ftp/${post.projeto_id}/${post.nome_imagem}${post.extensao_imagem}`);
    setImgError(false);
  }, [post]);

  return (
    <Link className={styles.link} href={`/blog/${post.projeto_id}`}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.imgCont}>
            <Image
              src={imageSrc}
              alt={post.nome_imagem}
              fill
              className={styles.img}
              priority={true}
              onError={handleImgError}
            />
          </div>
          <span className={styles.date}>{post.created_at.toString().slice(0, 10)}</span>
        </div>
        <div className={styles.bottom}>
          <h1 className={styles.title}>{post.nome_projeto}</h1>
          <p className={styles.desc}>Autor: {post.nome_autor}</p>
          <p className={styles.desc}>Ano: {post.ano_obra}</p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
