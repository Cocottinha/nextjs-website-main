import { connectToDB } from "@/lib/connectToDB"
import { Post } from "@/lib/models"
import { NextResponse } from "next/server"

export const GET = async (request,{params}) =>{
    const {slug} = params;
    console.log(slug)
    try {
        connectToDB()
        const post = await Post.findById(slug)
        return NextResponse.json(post)
        
    } catch (error) {
        console.log(error)
    }
}