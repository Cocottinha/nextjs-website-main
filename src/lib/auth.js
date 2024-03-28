import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDB } from "./connectToDB";
import bcrypt from "bcryptjs"
import { User } from "./models";
import { authConfig } from "./auth.config";

const login = async (credentials) => {
    try {
        try {
            connectToDB()
            const user = await User.findOne({username: credentials.username})

            if(!user){
                throw new Error("Wrong cred!")
            }

            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

            if(!isPasswordCorrect){
                throw new Error("Wrong cred!")
            }

            return user

        } catch (error) {
            console.log(error)
            throw new Error ("Failed to login!")
        }
    } catch (error) {
        return null
    }
}

export const {
    handlers:{GET,POST}, 
    auth, 
    signIn, 
    signOut,} 
    = NextAuth({
        ...authConfig,
    providers:[
        CredentialsProvider({
            async authorize(credentials){
                return await login(credentials)
            }
        })
    ],
    callbacks:{
        async signIn({user, account, profile}){
            console.log(user,account,profile)
            return true
        },
        ...authConfig.callbacks,
    }
});