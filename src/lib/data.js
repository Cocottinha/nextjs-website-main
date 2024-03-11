import { connectToDB } from "./connectToDB"
import {Post, User} from "./models"

export const getPosts = async () => {
    try {
        connectToDB()
        const posts = await Post.find()
        return posts
    } catch (error) {
        console.log(error)
        throw new Error("Failed posts")
    }
}

export const getPost = async (slug) =>{
    try {
        connectToDB();
        const post = await Post.findOne({slug})
        return post
    } catch (error) {
        console.log(error)
        throw new Error("Failed post")
    }
}
export const getUser = async (id) => {
    try {
        connectToDB();
        const user = await User.findById(id)
        return user
    } catch (error) {
        console.log(error)
        throw new Error("Failed user")
    }
}
export const getUsers = async () => {
    try {
        connectToDB();
        const users = await User.find()
        return users
    } catch (error) {
        console.log(error)
        throw new Error("Failed users")
    }
}