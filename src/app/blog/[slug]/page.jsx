import Image from "next/image"
import styles from "./page.module.css"
import PostUser from "@/components/postUser/postUser"
import { Suspense} from "react"
import {getPost} from "@/lib/data"
import ListPontos from "@/components/listPontos/listPontos"
import Loading from "@/app/loading"
import PontoAnalise from "@/components/pontoAnalise/pontoAnalise"

const getData = async (slug) => {
    const res = await fetch(`http://localhost:3000/api/blog/${slug}`,{next:{revalidate:3600}});

    if(!res.ok){
        throw new Error ("Wrong")
    }
    return res.json();
};

const SinglePostPage = async ({ params }) => {
    const { slug } = params;
    const post = await getData(slug);

    return (
        <div className={styles.container}>
            {post.img && 
            <div className={styles.imgContainer} id="imgContainer">
                <Image src={post.img} alt={post.desc} width={700} height={700} className={styles.img} priority={true}/>
                {post.Pontos.map((ponto) => (                   
                    <PontoAnalise key={ponto.IdPonto} IdPonto={ponto.IdPonto} X={ponto.X} Y={ponto.Y} largImg={post.X} altImg={post.Y}/>
                ))}                           
            </div>}
            <div className={styles.textContainer}>
                <h1 className={styles.title}>{post.title}</h1>
                <div className={styles.detail}>
                    {post && 
                    (<Suspense fallback={<div>Loading...</div>}>
                        <PostUser userId = {post.userId}></PostUser>
                    </Suspense>
                    )}
                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Date</span>
                        <span className={styles.detailValue}>{post.createdAt.toString().slice(0,10)}</span>
                    </div>
                </div>
                <div className={styles.row}>
                    <ListPontos data={post} slug={post.slug}/>
                </div>
            </div>
        </div>
    )
}

export default SinglePostPage