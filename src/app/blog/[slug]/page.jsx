import PostView from "@/components/postView/postView"
import styles from "./page.module.css"
import axios from "axios"
import { cookies } from "next/headers"

// const getData = async (slug) => {
//     const res = await fetch(`http://localhost/api/blog/${slug}`,{next:{revalidate:3600}});
//     console.log(res)
//     if(!res.ok)
//         throw new Error ("Wrong")

//     return res.json(); 
// };

const getData = async (slug) => {
  const a = cookies().get("access-token")
  console.log(a.value)
  try {
    const response = await axios.get(`${process.env.APIPOST}${slug}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'PostmanRuntime/7.39.0',
        'Connection': 'keep-alive',
        'Accept-Encoding': 'gzip, deflate, br',
        'Authorization': `Bearer ${a.value}`
      }
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch posts');
    }
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

const SinglePostPage = async ({ params }) => {
  const { slug } = params;
  const post = await getData(slug);

  return (
    <div className={styles.container}>
      <PostView post={post.Dados} />
    </div>
  )
}

export default SinglePostPage