"use client"
import PostCard from "@/components/postCard/postCard"
import styles from "@/app/blog/blog.module.css"
import ComboBox from "@/components/comboBox/comboBox";
import { useEffect, useState } from "react";

const getData = async () => {
    const res = await fetch("http://localhost:3000/api/blog",{next:{revalidate:3600}});

    if(!res.ok){
        throw new Error ("Wrong")

    }
    return res.json();
};

const Blog = async () =>{

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData();
                setPosts(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    
    const [sortedPosts, setSortedPosts] = useState([]);

    // console.log(JSON.stringify(posts, null, 2))
    // posts.sort((a, b) => {
    //     if (a.createdAt.valueOf() > b.createdAt.valueOf()) {
    //         return -1
    //     }
    //     if(a.createdAt.valueOf() < b.createdAt.valueOf()) {
    //         return 1
    //     }
    //     return 0
    // })
    // console.log()
    // console.log(JSON.stringify(posts, null, 2))

    return(
        <div className={styles.containerG}>
            <div className={styles.combox}>
                <ComboBox posts={posts} setSortedPosts={setSortedPosts} />
            </div>
            <div className={styles.container}>
                {sortedPosts.length > 0 ? (
                    sortedPosts.map((post) => (
                        <div className={styles.cont} key={post.id}>
                            <PostCard post={post} key={post.id} />
                        </div>
                    ))
                ) : (
                    posts.map((post) => (
                        <div className={styles.cont} key={post.id}>
                            <PostCard post={post} key={post.id} />
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
export default Blog