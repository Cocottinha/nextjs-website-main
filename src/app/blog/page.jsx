import PostCard from "@/components/postCard/postCard"
import styles from "@/app/blog/blog.module.css"
import {getPosts} from "@/lib/data"

const getData = async () => {
    const res = await fetch("http://localhost:3000/api/blog",{next:{revalidate:3600}});

    if(!res.ok){
        throw new Error ("Wrong")

    }
    return res.json();
};

const Blog = async () =>{

    const posts = await getData();
    //const posts = await getPosts();

    return(
        <div className={styles.container}>
            {posts.map((post) => (
                <div className={styles.cont} key={post.id}>
                    <PostCard post={post}/>
                </div>
            ))}
            
        </div>
    )
}
export default Blog