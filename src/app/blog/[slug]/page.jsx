import PostView from "@/components/postView/postView"

const getData = async (slug) => {
    const res = await fetch(`http://localhost:3000/api/blog/${slug}`,{next:{revalidate:3600}});

    if(!res.ok)
        throw new Error ("Wrong")
    
    return res.json(); 
};

const SinglePostPage = async ({ params }) => {
    const { slug } = params;
    const post = await getData(slug);

    return (
        <div>
            <PostView post={post}/>
        </div>
    )
}

export default SinglePostPage