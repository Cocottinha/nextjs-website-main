import { connectToDB } from "@/lib/connectToDB"
import { Post } from "@/lib/models"
import { NextResponse } from "next/server"

export const GET = async (request) =>{
    try {
        connectToDB()
        const posts = await Post.find()
        return NextResponse.json(posts)

    } catch (error) {
        console.log(error)
    }
}