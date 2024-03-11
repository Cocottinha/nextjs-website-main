import { connectToDB } from "@/lib/connectToDB"
import { Post } from "@/lib/models"
import { NextResponse } from "next/server"

export const GET = async (request,{params}) =>{
    const {slug} = params;
    try {
        connectToDB()
        const post = await Post.findOne({slug})
        return NextResponse.json(post)
        
    } catch (error) {
        console.log(error)
    }
}

// export const DELETE = async (request,{params}) =>{
//     const {slug} = params;
//     try {
//         connectToDB()
//         const post = await Post.deleteOne({slug})
//         return NextResponse.json("Deleted")
        
//     } catch (error) {
//         console.log(error)
//     }
// }