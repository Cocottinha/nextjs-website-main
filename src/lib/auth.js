import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDB } from "./connectToDB";
import bcrypt from "bcryptjs"
import { User } from "./models";
import { authConfig } from "./auth.config";
import mongoose from "mongoose";
import { cookies } from "next/headers";

const login = async (credentials) => {
    try {
        connectToDB()
        const user = await User.findOne({ username: credentials.username })

        if (!user) {
            throw new Error("Usuário não existe!")
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordCorrect) {
            throw new Error("Senha Errada!")
        }

        const blocked = user.isBlocked;

        if (blocked) {
            throw new Error("Usuário Bloqueado!")
        }
        
        await User.findOneAndUpdate({username: credentials.username},{lastLogin: Date.now()})
        console.log(user._id)
        cookies().set('user',user._id)
        return user
    } catch (error) {
        if (error instanceof mongoose.Error || error.name === 'MongoError') {
            console.error("MongoDB error:", error.message);
            throw new Error("Erro de banco de dados");
        } else if (error instanceof bcrypt.BcryptError) {
            console.error("Bcrypt error:", error.message);
            throw new Error("Erro ao verificar senha");
        } else {
            console.error("Erro desconhecido:", error.message);
            throw new Error("Falha ao fazer login");
        }
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