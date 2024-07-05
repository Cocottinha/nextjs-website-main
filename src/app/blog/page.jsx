"use client"
import PostCard from "@/components/postCard/postCard"
import styles from "@/app/blog/blog.module.css"
import ComboBox from "@/components/comboBox/comboBox";
import { useEffect, useState } from "react";
import { getPosts } from "@/lib/action";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPosts();
        setPosts(data.Dados);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [sortedPosts, setSortedPosts] = useState([]);

  return (
    <div className={styles.containerG}>
      <div className={styles.combox}>
        <ComboBox posts={posts} setSortedPosts={setSortedPosts} />
      </div>
      <div className={styles.container}>
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
            <div className={styles.cont} key={post.id}>
              <PostCard post={post} />
            </div>
          ))
        ) : (
          posts.map((post) => (
            <div className={styles.cont} key={post.id}>
              <PostCard post={post} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}
export default Blog