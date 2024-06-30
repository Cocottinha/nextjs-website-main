import { useState, useEffect } from "react";
import styles from "@/components/postUser/postUser.module.css";
import Image from "next/image";

const PostUser = ({ userId, username }) => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.avatar}
        src="/noavatar.png"
        alt=""
        height={50}
        width={50}
      />
      <div className={styles.texts}>
        <span className={styles.title}>Aluno(a)</span>
        <span className={styles.username}>{username}</span>
      </div>
    </div>
  );
};

export default PostUser;
