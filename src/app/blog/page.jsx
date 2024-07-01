"use client"
import PostCard from "@/components/postCard/postCard"
import styles from "@/app/blog/blog.module.css"
import { useEffect, useState } from "react";
import { getUser } from "@/lib/data";
import { getCookieId } from "@/lib/action";
import Link from "next/link";

const getData = async () => {
  const res = await fetch("/api/blog", { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error("Wrong")
  }
  return res.json();
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [userLoggedId, setUserLoggedId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userLoggedId = await getCookieId();
        const data = await getData();
        setUserLoggedId(userLoggedId);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.containerG}>
      <form>
        <Link href={"/addHour"}>
          <button className={styles.button}>Adicionar Hora</button>
        </Link>      
      </form>      
      <div className={styles.container}>
        {posts
          .filter(post => post.userId === userLoggedId)
          .map(post => (
            <div className={styles.cont} key={post.id}>
              <PostCard post={post} />
            </div>
          ))}
      </div>
    </div>
  )
}
export default Blog
